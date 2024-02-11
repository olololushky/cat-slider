import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { maxPages, pageLimit } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import withGlobalProviders from "./providers/GlobalProviders";
import {
  selectCats,
  selectCatsLoading,
  selectCatsPage,
} from "./store/selectors/cats.selectors";
import { getCats } from "./store/slices/cats.slice";
import { AppWrapper } from "./styled/App.styled";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const slideDuration = 7000;

  // store
  const dispatch = useAppDispatch();
  const cats = useAppSelector(selectCats);
  const page = useAppSelector(selectCatsPage);
  const isLoading = useAppSelector(selectCatsLoading);

  // fetch data
  useEffect(() => {
    dispatch(getCats());
  }, [dispatch]);

  // get more cats if less then 5 slides left
  useEffect(() => {
    if (!isLoading && currentIndex + 5 >= pageLimit * page && page < maxPages) {
      dispatch(getCats());
    }
  }, [currentIndex, page, dispatch, isLoading]);

  // preload next image
  useEffect(() => {
    if (!cats[currentIndex + 1]) return;
    const image = new Image();
    image.src = cats[currentIndex + 1]?.url;
  }, [currentIndex, cats]);

  // automatic slide show
  const setNextImageTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setProgress(0); // reset progress on start
    const start = Date.now();
    clearInterval(intervalRef.current);

    if (currentIndex + 2 > cats.length) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((p) => p + 1);
    }, slideDuration);
    intervalRef.current = setInterval(() => {
      const deltaTime = Date.now() - start;
      setProgress((deltaTime / slideDuration) * 100);

      if (deltaTime >= slideDuration) clearInterval(intervalRef.current);
    }, 100);
  }, [cats, currentIndex]);

  useEffect(() => {
    setNextImageTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, cats, setNextImageTimeout]);

  useEffect(() => clearInterval(intervalRef.current), []);

  const nextImage = useCallback(() => {
    if (currentIndex + 1 >= cats.length) return;
    setCurrentIndex((p) => p + 1);
  }, [cats, currentIndex]);

  const prevImage = useCallback(
    () => currentIndex > 0 && setCurrentIndex((p) => p - 1),
    [currentIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cats?.length, prevImage, nextImage]);

  return (
    <AppWrapper>
      {isLoading && !cats?.length && <CircularProgress className="loader" />}
      {!!cats?.length && (
        <>
          <IconButton
            onClick={prevImage}
            aria-label="previous"
            disabled={currentIndex <= 0}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Box className="content-container">
            <Box
              className="image-container"
              sx={{ backgroundImage: `url(${cats[currentIndex]?.url})` }}
            ></Box>

            <CircularProgress variant="determinate" value={progress} />
          </Box>
          <IconButton
            onClick={nextImage}
            aria-label="next"
            disabled={cats?.length - 1 <= currentIndex}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
    </AppWrapper>
  );
}

export default withGlobalProviders(App);
