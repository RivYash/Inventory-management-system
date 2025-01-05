<?php
// Include database connection
require_once 'core.php';

// Check if client_name is passed
if (isset($_POST['client_name'])) {
    $client_name = $_POST['client_name'];

    // Query to fetch mobile number and GSTN for the selected client
    $sql = "
    SELECT client_contact, cust_gstn 
    FROM orders 
    WHERE client_name = ? 
    ORDER BY 
        CASE 
            WHEN cust_gstn IS NOT NULL AND cust_gstn != '' THEN 1 
            ELSE 2 
        END,
        CASE 
            WHEN client_contact IS NOT NULL AND client_contact != '' THEN 1 
            ELSE 2 
        END,
        update_dt DESC;
    ";
        $stmt = $connect->prepare($sql);
    $stmt->bind_param("s", $client_name);
    $stmt->execute();
    $result = $stmt->get_result();

    // Return mobile number and GSTN as JSON
    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            'mobile_number' => htmlspecialchars($row['client_contact']),
            'customer_gstn' => htmlspecialchars($row['cust_gstn'])
        ]);
    } else {
        echo json_encode([
            'mobile_number' => 'Not found',
            'customer_gstn' => 'Not found'
        ]);
    }

    $stmt->close();
}
$connect->close();
?>