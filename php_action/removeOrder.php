<?php 

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

$orderId = $_POST['orderId'];

if ($orderId) {
    // Begin the transaction to ensure atomic updates
    $connect->begin_transaction();

    try {
        // 1. Get all the products and quantities from the order
        $productQuery = "SELECT product_id, quantity FROM order_item WHERE order_id = {$orderId}";
        $productResult = $connect->query($productQuery);

        if ($productResult->num_rows > 0) {
            // 2. Loop through each product and restore the quantity
            while ($product = $productResult->fetch_assoc()) {
                $productId = $product['product_id'];
                $quantityToRestore = $product['quantity'];

                // Get the current stock quantity
                $stockQuery = "SELECT quantity FROM product WHERE product_id = {$productId}";
                $stockResult = $connect->query($stockQuery);
                $stock = $stockResult->fetch_assoc();
                $currentStock = $stock['quantity'];

                // Restore the quantity in the product table
                $newStock = $currentStock + $quantityToRestore;
                $updateStockQuery = "UPDATE product SET quantity = {$newStock} WHERE product_id = {$productId}";
                $connect->query($updateStockQuery);
            }
        }

        // 3. Update the order status (e.g., mark as 'removed' or 'canceled')
        $updateOrderQuery = "UPDATE orders SET order_status = 2 WHERE order_id = {$orderId}";
        $connect->query($updateOrderQuery);

        // 4. Update the order item status to 'removed'
        $updateOrderItemQuery = "UPDATE order_item SET order_item_status = 2 WHERE order_id = {$orderId}";
        $connect->query($updateOrderItemQuery);

        // Commit the transaction
        $connect->commit();

        // Success message
        $valid['success'] = true;
        $valid['messages'] = "Order successfully removed, quantities restored.";

    } catch (Exception $e) {
        // If an error occurs, rollback the transaction
        $connect->rollback();

        // Error message
        $valid['success'] = false;
        $valid['messages'] = "Error while removing the order: " . $e->getMessage();
    }

    // Close the database connection
    $connect->close();
}

// Return the response
echo json_encode($valid);
?>
