// example of cat object
// {
//     "id":"0XYvRd7oD",
//     "width":1204,"height":1445,
//     "url":"https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
//     "breeds":[{
//         "weight":{"imperial":"7  -  10","metric":"3 - 5"},
//         "id":"abys","name":"Abyssinian",
//         "temperament":"Active, Energetic, Independent, Intelligent, Gentle",
//         "origin":"Egypt",
//         "country_codes":"EG",
//         "country_code":"EG",
//         "life_span":"14 - 15",
//         "wikipedia_url":"https://en.wikipedia.org/wiki/Abyssinian_(cat)"
//     }]
//     }

interface IBreed {
  weight: { imperial: string; metric: string };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
}

export interface ICat {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: IBreed[];
}
