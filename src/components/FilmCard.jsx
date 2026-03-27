export default function FilmCard({ title, posterPath, releaseDate, rating }) {
    
    return (
        <div className="card">
            <div className="film-card">
                <img
                    className="film-image"
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                />
                <span className="film-card-title">{title}</span>
                <span className="film-card-release">Release Date: {releaseDate}</span>
                <span className="film-card-vote">Rating: {rating}</span>
            </div>
        </div>
    );
}