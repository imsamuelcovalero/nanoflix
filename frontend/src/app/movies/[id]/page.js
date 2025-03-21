// src/app/movies/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMoviesStore } from "@/store/moviesStore";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TypographyH1, TypographyH4, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const { getMovieById, fetchMovies, isLoaded } = useMoviesStore();

  useEffect(() => {
    async function fetchMovieDetails() {
      let movieData = getMovieById(id);

      if (!movieData && !isLoaded) {
        await fetchMovies();
        movieData = getMovieById(id);
      }

      if (movieData) {
        setMovie(movieData);
      } else {
        console.error("Filme não encontrado");
        router.push("/movies");
      }
    }

    async function fetchReviews() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`);
        console.log("reviewsResponse", response);

        setReviews(response.data);
      } catch (error) {
        console.error("Erro ao buscar reviews:", error.message);
      }
    }

    fetchMovieDetails();
    fetchReviews();
  }, [id]);

  async function handleReviewSubmit() {
    if (!newReview.trim()) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        movieId: id,
        content: newReview,
      });
      setNewReview("");
      fetchReviews(); // Atualiza os reviews após o envio
    } catch (error) {
      console.error("Erro ao enviar review:", error.message);
    }
  }

  if (!movie) return <p className="text-center mt-6">Carregando...</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <TypographyH1 className="text-4xl font-bold text-center w-full">{movie.title}</TypographyH1>

      <Card className="shadow-md transition-transform duration-200 flex flex-col min-w-[300px] max-w-[500px] mx-auto mt-6">
        <CardContent className="p-4 flex flex-col h-full justify-between items-center">
          <AspectRatio ratio={2 / 3} className="w-full">
            <img
              src={movie.url_image}
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
          </AspectRatio>
          <TypographyP className="mt-4 text-center">{movie.description}</TypographyP>
        </CardContent>
      </Card>

      <div className="w-full max-w-[500px] mt-8">
        <TypographyH4 className="text-lg font-semibold text-center">Reviews</TypographyH4>
        {reviews.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {reviews.map((review, index) => (
              <li key={index} className="border p-3 rounded-md shadow-sm">
                {review.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-2 text-gray-500">Nenhum review ainda.</p>
        )}

        <div className="mt-4 flex flex-col items-center">
          <Input
            className="w-full max-w-[400px] mb-2"
            placeholder="Escreva um review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Button onClick={handleReviewSubmit}>Enviar Review</Button>
        </div>
      </div>
    </div>
  );
}
