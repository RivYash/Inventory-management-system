<?php 	

require_once 'core.php';

// $sql = "SELECT product_id, product_name,brand_id FROM product WHERE status = 1 AND active = 1 AND quantity > 0";
$sql = "SELECT product.product_id, product.product_name, product.brand_id,
 		product.categories_id, product.quantity,product.active, product.status, 
 		brands.brand_name, categories.categories_name FROM product 
		INNER JOIN brands ON product.brand_id = brands.brand_id 
		INNER JOIN categories ON product.categories_id = categories.categories_id  
		WHERE product.status = 1 AND product.quantity > 0";




$result = $connect->query($sql);

$data = $result->fetch_all();

$connect->close();

echo json_encode($data);