import React from "react";
import { render, screen } from "@testing-library/react";
import MoviesList from "../components/MoviesList";



// Mock data for MoviesList
const mockMovieList = [
  {
    MovieID: 1,
    Title: "Example Movie",
    ReleaseYear: "2023",
    PosterImage: "example.jpg",
    AvgRating: 4.5,
  },
  {
    MovieID: 2,
    Title: "Another Movie",
    ReleaseYear: "2022",
    PosterImage: "another.jpg",
    AvgRating: null,
  },
];

describe("MoviesList Component", () => {
  test("renders movie titles correctly", () => {
    render(<MoviesList list={mockMovieList} />);
    expect(screen.getByText("Example Movie")).toBeInTheDocument();
    expect(screen.getByText("Another Movie")).toBeInTheDocument();
  });

  test("displays poster images with correct alt text", () => {
    render(<MoviesList list={mockMovieList} />);
    expect(screen.getByAltText("Example Movie")).toBeInTheDocument();
    expect(screen.getByAltText("Another Movie")).toBeInTheDocument();
  });

  test("renders release year correctly", () => {
    render(<MoviesList list={mockMovieList} />);
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  test("displays average rating or default message if rating is not available", () => {
    render(<MoviesList list={mockMovieList} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("NR/NA")).toBeInTheDocument();
  });
});
