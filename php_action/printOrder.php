<?php    



function readNumToWord($number){
   $no = floor($number);
   $point = round($number - $no, 2) * 100;
   $hundred = null;
   $digits_1 = strlen($no);
   $i = 0;
   $str = array();
   $words = array('0' => '', '1' => 'one', '2' => 'two',
    '3' => 'three', '4' => 'four', '5' => 'five', '6' => 'six',
    '7' => 'seven', '8' => 'eight', '9' => 'nine',
    '10' => 'ten', '11' => 'eleven', '12' => 'twelve',
    '13' => 'thirteen', '14' => 'fourteen',
    '15' => 'fifteen', '16' => 'sixteen', '17' => 'seventeen',
    '18' => 'eighteen', '19' =>'nineteen', '20' => 'twenty',
    '30' => 'thirty', '40' => 'forty', '50' => 'fifty',
    '60' => 'sixty', '70' => 'seventy',
    '80' => 'eighty', '90' => 'ninety');
   $digits = array('', 'hundred', 'thousand', 'lakh', 'crore');
   while ($i < $digits_1) {
     $divider = ($i == 2) ? 10 : 100;
     $number = floor($no % $divider);
     $no = floor($no / $divider);
     $i += ($divider == 10) ? 1 : 2;
     if ($number) {
        $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
        $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
        $str [] = ($number < 21) ? $words[$number] .
            " " . $digits[$counter] . $plural . " " . $hundred
            :
            $words[floor($number / 10) * 10]
            . " " . $words[$number % 10] . " "
            . $digits[$counter] . $plural . " " . $hundred;
     } else $str[] = null;
  }
  $str = array_reverse($str);
  $result = implode('', $str);
  $points = ($point) ?
    "." . $words[$point / 10] . " " . 
          $words[$point = $point % 10] : '';
  return $f_result = $result . "only";
}


require_once 'core.php';

$orderId = $_POST['orderId'];

$sql = "SELECT order_date, client_name, client_contact, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_place,gstn,cust_gstn,pla_fin_yr_t,update_dt FROM orders WHERE order_id = $orderId";

$orderResult = $connect->query($sql);
$orderData = $orderResult->fetch_array();

$orderDate = $orderData[0];
$clientName = $orderData[1];
$clientContact = $orderData[2]; 
$subTotal = $orderData[3];
$vat = $orderData[4];
$totalAmount = $orderData[5]; 
$discount = $orderData[6];
$grandTotal = $orderData[7];
$paid = $orderData[8];
$due = $orderData[9];
$payment_place = $orderData[10];
$gstn = $orderData[11];
$cust_gstn = $orderData[12];
$pla_fin_yr = $orderData[13];
$odtime = $orderData[14];


   $sql_m = "SELECT order_date, client_name FROM orders WHERE order_id = $orderId";
   
   $orderResult = $connect->query($sql);
   $orderData = $orderResult->fetch_array();
   
   $orderDate = $orderData[0];

$ffdff = $orderDate;


// Create DateTime objects
$currentDateTime = new DateTime();  // Current date and time
$targetDateTime = new DateTime($odtime);  // Target date and time

// Truncate the seconds from both DateTime objects
$currentDateTime->setTime($currentDateTime->format('H'), $currentDateTime->format('i'));  // Set time with only hours and minutes
$targetDateTime->setTime($targetDateTime->format('H'), $targetDateTime->format('i'));  // Set time with only hours and minutes
// Compare timestamps ignoring the seconds
if ($currentDateTime > $targetDateTime) {
   $invtype = "";
} else {
   $invtype = "";
}


// $orderItemSql = "SELECT order_item.product_id, order_item.rate, order_item.quantity, order_item.total,
//                   product.product_name, order_item.item_discount_t FROM order_item
//                   INNER JOIN product ON order_item.product_id = product.product_id 
//                   WHERE order_item.order_id = $orderId";

                  $orderItemSql = "SELECT 
                  order_item.product_id, 
                  order_item.rate, 
                  order_item.quantity, 
                  order_item.total, 
                  product.product_name, 
                  order_item.item_discount_t,
                  brands.brand_name,           -- Brand name from the 'brands' table
                  categories.categories_name  -- Category name from the 'categories' table
                  FROM order_item
                  INNER JOIN product ON order_item.product_id = product.product_id
                  INNER JOIN brands ON product.brand_id = brands.brand_id  -- Join with the 'brands' table
                  INNER JOIN categories ON product.categories_id = categories.categories_id  -- Join with the 'categories' table
                  WHERE order_item.order_id = $orderId";



                        
 		            //       brands.brand_name, categories.categories_name FROM product 
		            // INNER JOIN brands ON product.brand_id = brands.brand_id 
		            // INNER JOIN categories ON product.categories_id = categories.categories_id  
		            // WHERE product.status = 1 AND product.quantity > 0";


$orderItemResult = $connect->query($orderItemSql);

 $table = '
<table align="center" cellpadding="2" cellspacing="0" style="width: 100%;border:1px solid black;margin-bottom: 10px;">
<tbody>
   <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;font-weight: bold;">TAX INVOICE</td>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 20px;">Shree Sateri Stationery</td>
      </tr>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;">Chirekhan Cudne Sankhali Goa</td>
      </tr>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;">mob:7219815676, 9604946416</td>
      </tr>
   </tr>
   <tr>
                     <td colspan="2" style="padding: 0px;vertical-align: top;">
                        <table align="left" cellpadding="0" cellspacing="0" style="border:1px solid black; width: 100%">
                           <tbody>
                              <tr>
                                 <td style="width: 74px;vertical-align: top;" rowspan="3">TO, </td>
                                 <td>Name: '.$clientName.'</td>
                              </tr>
                              <tr>
                                 <td>Phone: '.$clientContact.'</td>
                              </tr>
                              <tr>
                                 <td>Customer GSTN: '.$cust_gstn.' </td>
                              </tr>
                              
                           </tbody>
                        </table>
                     </td>
                     <td style="padding: 0px;vertical-align: top;" colspan="7">
                        <table align="left" cellpadding="0" cellspacing="0" style="width: 100%">
                           <tbody>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-top: 1px solid black;border-right: 1px solid black;">&nbsp; Invoice No : '.$orderId.'-'.$pla_fin_yr.'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-right: 1px solid black;">&nbsp; Date: '.date("d/m/Y", strtotime($orderDate)).'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-right: 1px solid black;font-size: small;">&nbsp; '.$invtype.'</td>
                              </tr>
                              
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td style="width: 10px;text-align: center;border-left: 1px solid black;border-bottom: 1px solid black;-webkit-print-color-adjust: exact;">S.N.</td>
                     <td style="width: 50%;text-align: center;border-left: 1px solid black;border-top-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Description Of Goods</td>
                     <td colspan="1" style="width: 200px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Qty.</td>
                     <td colspan="1" style="width: 300px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">MRP&nbsp; ₹<br>
                     <td colspan="1" style="width: 100px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Disc (%)</td>
                     <td colspan="1" style="width: 100px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Rate after Disc (₹)</td>
                     <td style="width: 150px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Amount&nbsp; (₹)</td>
                  </tr>';
                  $x = 1;
                  $cgst = 0;
                  $igst = 0;
                  if($payment_place == 2)
                  {
                     $igst = $subTotal*18/100;
                  }
                  else
                  {
                     $cgst = $subTotal*9/100;
                  }
                  $total = $subTotal+2*$cgst+$igst;

                  while($row = $orderItemResult->fetch_array()) {  
                     $tgst = $row[3]*18/100;  
                     $t_tgst = $tgst+$row[3];

                     $w_total = $row[2]*$row[1];
                     $t_item_discount = ($w_total*$row[5])/100;
                     $f_t_item_discount = $w_total - $t_item_discount;
                     $f_f_t_item_discount = number_format((float)$f_t_item_discount, 2, '.', '');

                     $rate_item_discount = ($row[1]*$row[5])/100;    
                     
                     $rateAfterDiscount = $row[1]- $rate_item_discount;
                              
                     $table .= '<tr>
                           <td style="text-align: center;font-size: 16px;border-left: 1px solid black;height: 14px;">'.$x.'</td>
                           <td style="font-size: 16px;border-left: 1px solid black;height: 14px;">'.$row[6].' - '.$row[4].'</td>
                           <td colspan="1" style="text-align: center;font-size: 16px;border-left: 1px solid black;height: 14px;">'.$row[2].'</td>
                           <td colspan="1" style="text-align: right;font-size: 16px;border-left: 1px solid black;height: 14px;">'.number_format((float)$row[1], 2, '.', '').'</td>
                           <td colspan="1" style="text-align: center; font-size: 16px;border-left: 1px solid black;height: 14px;">'.$row[5].'%'.'</td>
                           <td colspan="1" style="text-align: right; font-size: 16px;border-left: 1px solid black;height: 14px;">'.number_format((float)$rateAfterDiscount, 2, '.', '').'</td>
                           <td style="text-align: right; font-size: 16px;border-left: 1px solid black;height: 14px;">'.$f_f_t_item_discount.'</td>
                        </tr>';
                  $x++;
                  } // /while
                  $cal_height = 600 - 25*$x;

                  $table .= '<tr>
                  <td style="font-size: 14px;border-left: 1px solid black;height:'.$cal_height.';"></td>
                  <td style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="1" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="1" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="1" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="1" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  </tr>';
         
               $round_of_calc =  round($subTotal) - $subTotal;
                $table.= '

                  <tr style=" border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>
                     <td style="height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>
                     <td colspan="1" style="height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>                     
                     <td colspan="3" style="text-align: right;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;">Total</td> 
                     <td style="text-align: right; border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;">'.'₹'.$subTotal.'</td> 
                  </tr>

                  <tr style=" border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;"></td>
                     <td style="height: 27px;border-bottom: 1px solid black;font-size: 14px;"></td>
                     <td colspan="4" style="text-align: right;height: 27px;border-bottom: 1px solid black;font-size: 14px;">Rounded off(+/-)</td> 
                     <td style="text-align: right; border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;">'.number_format(round($round_of_calc, 2), 2, '.', '').'</td> 
                  </tr>

                  <tr style="border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 40px;border-top: 1px solid black;"></td>
                     <td style="height: 40px;border-top: 1px solid black;text-align:center;font-size: small;">'.'('.readNumToWord($subTotal).')'.'</td>                   
                     <td colspan="4" style="text-align: right;height: 40px;font-weight: 600;border-top: 1px solid black;">Grand Total</td>
                     <td colspan="4" style="text-align: right;border-left: 1px solid black;height: 40px;font-weight: 600;border-top: 1px solid black;">'.'₹'.round($subTotal).'.00/-</td> 
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="7" style="border-left: 1px solid black;height: 27px;border-top: 1px solid black;padding-left: 5%;">Bank Name : Canara Bank Cudnem, Account Number : 120027003031, IFSC Code : CNRB0017233</td>
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="3" style="border-left: 1px solid black;height: 10px;border-top: 1px solid black;padding-left: 5%;">Terms and conditions</td>
                     <td colspan="4"style="border-top: 1px solid black;border-left: 1px solid black;height: 27px;text-align:center;">Shree Sateri Stationery</td> 
                  </tr>
                  <tr style="border-bottom: 1px solid black;height: 50px;">
                     <td colspan="3" style="border-left: 1px solid black;height: 10px;padding-left: 5%;">1. Goods once sold will not be taken back</td>
                     <td colspan="4" style="border-left: 1px solid black;height: 10px;padding-left: 5%;">&nbsp</td>
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="3" style="border-left: 1px solid black;height: 10px;padding-left: 5%;">&nbsp</td>
                     <td colspan="4" style="text-align:center;border-left: 1px solid black;height: 10px;">Signature</td>
                  </tr>
</tbody>   
</table>';
$connect->close();

echo $table;