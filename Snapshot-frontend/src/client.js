import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//before this project used sanityClient obj but it had deprecated so changed it to createClient

export const client = createClient({
  // projectId: "3c08lrhi",
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-10-16",
  useCdn: true,
  // token:
  //   "skrStf9zehPeNwygqdOLsJErt2bt82M13ccEPeb0WU4MWHMbmLuTphEcbSTVwvVurN8wywQ2YHxFwztTP2Qs3kth6Kd1vXWVhdo0KczkGJu4BylbmBPXXzpCnbJ4MVR5jZ4qiIaaIyKk0nqk3flgBmFXWLSfqJbzY418l8f20XricO9L1qp7",
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
