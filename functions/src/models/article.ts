enum provider {
  CorporatieNL,
  Aedes
}

type Article = {
  link: string;
  provider: provider;
  title: string;
  topics: string[];
  categories: string[];
  aticleDate: Date;
  mailDates: Date[];
};
