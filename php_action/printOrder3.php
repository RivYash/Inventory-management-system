<?php    

require_once 'core.php';

$orderId = $_POST['orderId'];

$sql = "SELECT order_date, client_name, client_contact, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_place,gstn,cust_gstn FROM orders WHERE order_id = $orderId";

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


   $sql_m = "SELECT order_date, client_name FROM orders WHERE order_id = $orderId";
   
   $orderResult = $connect->query($sql);
   $orderData = $orderResult->fetch_array();
   
   $orderDate = $orderData[0];

$ffdff = $orderDate;


$orderItemSql = "SELECT order_item.product_id, order_item.rate, order_item.quantity, order_item.total,
product.product_name FROM order_item
   INNER JOIN product ON order_item.product_id = product.product_id 
 WHERE order_item.order_id = $orderId";
$orderItemResult = $connect->query($orderItemSql);

 $table = '
<table align="center" cellpadding="5" cellspacing="0" style="width: 100%;border:1px solid black;margin-bottom: 10px;">
<tbody>
   <tr>
      <td colspan="9" style="text-align:center; font-size: 25px;">TAX INVOICE-'.$ffdff.'</td>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;">Business name</td>
      </tr>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;">Hno 380/2 marra pilerne bardez goa</td>
      </tr>
      <tr>
      <td colspan="9" style="text-align:center; font-size: 15px;">mob:88888496849 tel :99999999999</td>
      </tr>
   </tr>
   <tr>
                     <td colspan="2" style="padding: 0px;vertical-align: top;">
                        <table align="left" cellpadding="0" cellspacing="0" style="border:1px solid black; width: 100%">
                           <tbody>
                              <tr>
                                 <td style="width: 74px;vertical-align: top;" rowspan="4">TO, </td>
                                 <td>Name: '.$clientName.'</td>
                              </tr>
                              <tr>
                                 <td>&nbsp</td>
                              </tr>
                              <tr>
                                 <td>Phone: '.$clientContact.'</td>
                              </tr>
                              <tr>
                                 <td>Customer GSTN: '.$cust_gstn.' </td>
                              </tr>
                              <tr>
                                 <td>&nbsp</td>
                              </tr>
                              
                           </tbody>
                        </table>
                     </td>
                     <td style="padding: 0px;vertical-align: top;" colspan="7">
                        <table align="left" cellpadding="0" cellspacing="0" style="width: 100%">
                           <tbody>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-top: 1px solid black;border-right: 1px solid black;">&nbsp; Bill No : .</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-right: 1px solid black;">&nbsp; Date: '.date("d/m/Y", strtotime($orderDate)).'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;height: 53px;border-right: 1px solid black;">&nbsp; G.S.T.IN:</td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td style="width: 10px;text-align: center;border-left: 1px solid black;border-bottom: 1px solid black;-webkit-print-color-adjust: exact;">S.N.</td>
                     <td style="width: 50%;text-align: center;border-left: 1px solid black;border-top-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Description Of Goods</td>
                     <td colspan="2" style="width: 150px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Qty.</td>
                     <td colspan="2" style="width: 200px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Rate&nbsp; Rs.<br>
                     <td style="width: 150px;text-align: center;border-top-style: solid;border-left: 1px solid black;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;-webkit-print-color-adjust: exact;">Amount&nbsp; Rs.</td>
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
                              
                     $table .= '<tr>
                           <td style="font-size: 14px;border-left: 1px solid black;height: 13px;">'.$x.'</td>
                           <td style="font-size: 14px;border-left: 1px solid black;height: 13px;">'.$row[4].'</td>
                           <td colspan="2" style="font-size: 14px;border-left: 1px solid black;height: 13px;">'.$row[2].'</td>
                           <td colspan="2" style="font-size: 14px;border-left: 1px solid black;height: 13px;">'.$row[1].'</td>
                           <td style="font-size: 14px;border-left: 1px solid black;height: 13px;">'.$w_total.'</td>
                        </tr>';
                  $x++;
                  } // /while
                  $cal_height = 450 - 25*$x;

                  $table .= '<tr>
                  <td style="font-size: 14px;border-left: 1px solid black;height:'.$cal_height.';"></td>
                  <td style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="2" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td colspan="2" style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  <td style="font-size: 14px;border-left: 1px solid black;height: '.$cal_height.';"></td>
                  </tr>';
         
               echo $round_of_calc =  round($subTotal) - $subTotal;
                $table.= '

                  <tr style=" border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>
                     <td style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>
                     <td colspan="2" style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;"></td>                     
                     <td colspan="2" style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;">Total</td> 
                     <td style="border-left: 1px solid black;height: 10px;border-bottom: 1px solid black;border-top: 1px solid black;">'.$subTotal.'</td> 
                  </tr>

                  <tr style=" border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;"></td>
                     <td style="border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;"></td>
                     <td colspan="4" style="border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;">Rounded off(+/-)</td> 
                     <td style="border-left: 1px solid black;height: 27px;border-bottom: 1px solid black;font-size: 14px;">'.$round_of_calc.'</td> 
                  </tr>

                  <tr style="border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;height: 40px;border-top: 1px solid black;"></td>
                     <td style="border-left: 1px solid black;height: 40px;border-top: 1px solid black;"></td>                   
                     <td colspan="4" style="border-left: 1px solid black;height: 40px;font-weight: 600;border-top: 1px solid black;">Grand Total</td> 
                     <td colspan="4" style="border-left: 1px solid black;height: 40px;font-weight: 600;border-top: 1px solid black;">'.round($subTotal).'.00/-</td> 
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="7" style="border-left: 1px solid black;height: 27px;border-top: 1px solid black;padding-left: 5%;">Bank Name : Canara Bank, Account Number : 120027003031, IFSC Code : CNRB0017233</td>
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="4" style="border-left: 1px solid black;height: 10px;border-top: 1px solid black;padding-left: 5%;">Terms and conditions</td>
                     <td colspan="3"rowspan="3" style="border-top: 1px solid black;border-left: 1px solid black;height: 27px;text-align:center; padding-top:100px;">Signature</td> 
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="4" style="border-left: 1px solid black;height: 10px;padding-left: 5%;">1. Goods ons sold will not be taken back</td>
                  </tr>
                  <tr style="border-bottom: 1px solid black;">
                     <td colspan="4" style="border-left: 1px solid black;height: 10px;padding-left: 5%;">2. Intrest rate at 18% will be charged if the payment is not done within the stipulated time</td>
                  </tr>
</tbody>   
</table>';
$connect->close();

echo $table;