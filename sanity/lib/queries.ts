import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[
  _type == "startup"
  && defined(_id) && !defined($search) || title match $search || author->name match $search || category match $search
] | order(_createdAt desc) {
  _id,
  title,
  _createdAt,
  description,
  image,
  views,
  category,
  author -> {
    name,
    image,
    githubId,
  }
}`);

export const STARTUP_BY_ID_QUERY = defineQuery(`*[
  _type == "startup"
  && _id == $id][0] {
  title,
  _createdAt,
  description,
  image,
  views,
  category,
  pitch,
  author -> {
    name,
    image,
    githubId,
    username
  }
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[
  _type == "author"
  && githubId == $id][0] {
  _id,
  name,
  username,
  email,
  bio,
  image
}`);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`*[
  _type == "startup" 
  && author->githubId == $id] |
  order(_createdAt desc)`);
