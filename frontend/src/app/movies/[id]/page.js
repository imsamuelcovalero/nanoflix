// src/app/movies/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMoviesStore } from '@/store/moviesStore';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { TypographyH1, TypographyH4, TypographyP } from '@/components/ui/typography';
import PageContainer from '@/components/ui/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import StarRating from '@/components/ui/StarRating';
import { Star } from 'lucide-react';

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const { getMovieById, fetchMovies, isLoaded } = useMoviesStore();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    const savedReview = localStorage.getItem('pendingReview');
    const savedRating = localStorage.getItem('pendingRating');

    if (savedReview) {
      setNewReview(savedReview);
    }

    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, []);

  async function fetchReviews(movieId) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${movieId}`);
      console.log('reviewsResponse', response);
      setReviews(response.data);
    } catch (error) {
      console.error('Erro ao buscar reviews:', error.message);
    }
  }

  useEffect(() => {
    if (!id) return;

    async function fetchMovieDetails() {
      let movieData = getMovieById(id);

      if (!movieData && !isLoaded) {
        await fetchMovies();
        movieData = getMovieById(id);
      }

      if (movieData) {
        setMovie(movieData);
      } else {
        console.error('Filme não encontrado');
        router.push('/movies');
      }
    }

    fetchMovieDetails();
    fetchReviews(id);
  }, [id]);

  async function handleReviewSubmit() {
    if (!newReview.trim() || rating === 0) {
      alert('Por favor, escreva um review e selecione uma nota.');
      return;
    }

    if (!isAuthenticated) {
      // Salva o review e redireciona para login
      console.log('Usuário não autenticado. Salvando review para envio após login...');

      localStorage.setItem('pendingReview', newReview);
      localStorage.setItem('pendingRating', rating);
      localStorage.setItem('redirectAfterLogin', `/movies/${id}`);
      router.push('/unauthorized/review_only');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        { movieId: id, comment: newReview, rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNewReview('');
      localStorage.removeItem('pendingReview');
      localStorage.removeItem('pendingRating');
      fetchReviews(id);
    } catch (error) {
      console.error('Erro ao enviar review:', error.message);
    }
  }

  if (!movie) return <p className="text-center mt-6">Carregando...</p>;

  return (
    <PageContainer>
      {/* Card do filme */}
      <Card className="shadow-md transition-transform duration-200 flex flex-col w-full max-w-md lg:max-w-xs lg:mr-8">
        <CardContent className="p-4 flex flex-col h-full justify-between items-center">
          <AspectRatio ratio={2 / 3} className="w-full">
            <img
              src={movie.url_image}
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
          </AspectRatio>
          <TypographyH1 className="text-2xl font-bold text-center mt-4">{movie.title}</TypographyH1>
          <TypographyP className="mt-4 text-center">{movie.description}</TypographyP>
        </CardContent>
      </Card>

      {/* Seção de reviews */}
      <div className="w-full max-w-lg lg:flex-1 flex flex-col items-center text-center">
        <TypographyH4 className="text-lg font-semibold">Reviews</TypographyH4>
        {reviews.length > 0 ? (
          <ul className="mt-4 space-y-2 w-full max-w-[500px]">
            {reviews.map((review, index) => (
              <li key={index} className="border p-3 rounded-md shadow-sm bg-white flex flex-col">
                <StarRating rating={review.rating} /> {/* Exibe as estrelas */}
                <p className="mt-2">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-2 text-gray-500">Nenhum review ainda.</p>
        )}

        {/* Formulário de review */}
        <div className="mt-4 flex flex-col items-center w-full max-w-[500px]">
          <Input
            className="w-full mb-2"
            placeholder="Escreva um review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />

          {/* Seletor de nota */}
          <div className="flex items-center mb-4">
            <span className="mr-2">Nota:</span>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={
                  index < rating ? 'text-yellow-500 cursor-pointer' : 'text-gray-300 cursor-pointer'
                }
                size={24}
                fill={index < rating ? 'currentColor' : 'none'}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>

          <Button onClick={handleReviewSubmit} className="w-full">
            Enviar Review
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
