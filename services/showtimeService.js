import { supabase } from "./supabase";

export const getShowtimes = async (movieId) => {

  const { data, error } = await supabase
    .from("showtimes")
    .select("*")
    .eq("movie_id", movieId);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};