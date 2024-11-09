// script.js

let reviews = [];

// Fetch reviews from JSON file and display them
fetch("Xiaomi_Power_Bank_4i_reviews.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    reviews = data;
    displayReviews(reviews); // Display all reviews initially
  })
  .catch((error) => console.error("Error fetching reviews:", error));

// Function to display reviews
function displayReviews(filteredReviews) {
  const reviewContainer = document.getElementById("reviewContainer");
  reviewContainer.innerHTML = ""; // Clear existing reviews

  filteredReviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    reviewCard.innerHTML = `
            <div class="review-title">${review.Review_Title}</div>
            <div class="review-body">${review.Review_Body}</div>
            <div class="review-footer">
                <span class="review-rating">Rating: ${"⭐".repeat(
                  review.Review_Rating
                )}</span>
                <span>Reviewed by ${review.review_profile_name} - ${
      review.review_context
    }</span>
            </div>
        `;

    reviewContainer.appendChild(reviewCard);
  });
}

// Filter reviews based on selected rating and top/worst filter
function filterReviews() {
  const ratingFilter = document.getElementById("ratingFilter").value;
  const topWorstFilter = document.getElementById("topWorstFilter").value;

  let filteredReviews =
    ratingFilter === "all"
      ? reviews
      : reviews.filter((review) => review.Review_Rating == ratingFilter);

  // Apply top/worst filter
  if (topWorstFilter === "top10") {
    // Sort by highest rating and take top 10
    filteredReviews = [...filteredReviews]
      .sort((a, b) => b.Review_Rating - a.Review_Rating)
      .slice(0, 10);
  } else if (topWorstFilter === "worst10") {
    // Sort by lowest rating and take worst 10
    filteredReviews = [...filteredReviews]
      .sort((a, b) => a.Review_Rating - b.Review_Rating)
      .slice(0, 10);
  }

  displayReviews(filteredReviews);
}
