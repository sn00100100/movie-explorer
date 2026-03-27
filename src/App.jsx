import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilmCard from "./components/FilmCard";
import Pagination from "./components/Pagination";

// Variable to hold api
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDZhZmQ4NDRiNDE4Y2QyNGIyMWI3MjY2ODQxMWZjOSIsIm5iZiI6MTc3MjY3ODc5MS41Mywic3ViIjoiNjlhOGVlODdiY2ZlMDA0MmE0OTM4ZWY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TMjgFRGZlmSt4dipI_rTQqMuC3WvIsDWL39YruohsFg"

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
};

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [films, setFilms] = useState([]);

    // Updates when any state changes
    useEffect(() => {

        const sortFilms = (films) => {
            if (sortValue === "release-date-asc") {
                films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            } else if (sortValue === "release-date-desc") {
                films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            } else if (sortValue === "rating-asc") {
                films.sort((a, b) => a.vote_average - b.vote_average);
            } else if (sortValue === "rating-desc") {
                films.sort((a, b) => b.vote_average - a.vote_average);
            }

            return films;
        };

        // Function to call api for film
        const getData = async () => {
            try {
                const url = searchTerm
                    ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${currentPage}`
                    : `https://api.themoviedb.org/3/movie/popular?page=${currentPage}`;

                const response = await fetch(url, options);
                const data = await response.json();

                setTotalPages(data.total_pages);

                let results = data.results.slice(0, 20);
                results = sortFilms(results);

                setFilms(results);

            } catch (error) {
                console.error("Error", error);
            }
        };

        getData();

    }, [searchTerm, sortValue, currentPage]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <Header />
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                sortValue={sortValue}
                onSortChange={handleSortChange}
            />
            <div id="film-container">
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        title={film.title}
                        posterPath={film.poster_path}
                        releaseDate={film.release_date}
                        rating={film.vote_average}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
}