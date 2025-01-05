<?php
require_once 'core.php';
// Get the search input
$search = $_POST['search'] ?? '';

// Query the database for matching client names
$sql = "SELECT DISTINCT client_name FROM orders WHERE client_name LIKE ? LIMIT 10";
$stmt = $connect->prepare($sql);
$likeQuery = "%$search%";
$stmt->bind_param("s", $likeQuery);
$stmt->execute();
$result = $stmt->get_result();

// Return matching results
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div>" . htmlspecialchars($row['client_name']) . "</div>";
    }
} else {
    echo "<div>No results found</div>";
}

$stmt->close();
$connect->close();
?>