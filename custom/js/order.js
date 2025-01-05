var manageOrderTable;


// $(document).ready(function() {
//     // Call addRow on page load to add the first row
//     addRow();
//     });

$(document).ready(function() {
	$("#paymentPlace").change(function(){
		if($("#paymentPlace").val() == 2)
		{
			$(".gst").text("GST");
		}
		else
		{
			$(".gst").text("Customer gstn");	
		}
});

	var divRequest = $(".div-request").text();

	// top nav bar 
	$("#navOrder").addClass('active');

	if(divRequest == 'add')  {
		// add order	
		// top nav child bar 
		$('#topNavAddOrder').addClass('active');
		
		// Set today's date as the default value for orderDate field
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		var yyyy = today.getFullYear();
	
		today = yyyy + '-' + mm + '-' + dd;
	
		// Set the value of the orderDate input to today's date
		$("#orderDate").val(today);
		$("#orderDate").attr("max", today); 

		$("#orderDate").on('input', function() {
			var inputDate = $(this).val();
			if (inputDate > today) {
				$(this).val(today); // Reset to today's date if user selects a future date
				alert("Future dates are not allowed.");
			}
		});
	

		// create order form function
		$("#createOrderForm").unbind('submit').bind('submit', function() {
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var orderDate = $("#orderDate").val();
			var clientName = $("#clientName").val();
			var clientContact = $("#clientContact").val();
			var paid = $("#paid").val();
			var discount = $("#discount").val();
			var paymentType = $("#paymentType").val();
			var paymentStatus = $("#paymentStatus").val();		

			

			// form validation 
			if(orderDate == "") {
				$("#orderDate").after('<p class="text-danger"> The Order Date field is required </p>');
				$('#orderDate').closest('.form-group').addClass('has-error');
			} else {
				$('#orderDate').closest('.form-group').addClass('has-success');
			} // /else

			if(clientName == "") {
				$("#clientName").after('<p class="text-danger"> The Client Name field is required </p>');
				$('#clientName').closest('.form-group').addClass('has-error');
			} else {
				$('#clientName').closest('.form-group').addClass('has-success');
			} // /else

			// if(clientContact == "") {
			// 	$("#clientContact").after('<p class="text-danger"> The Contact field is required </p>');
			// 	$('#clientContact').closest('.form-group').addClass('has-error');
			// } else {
			// 	$('#clientContact').closest('.form-group').addClass('has-success');
			// } // /else

			if(paid == "") {
				$("#paid").after('<p class="text-danger"> The Paid field is required </p>');
				$('#paid').closest('.form-group').addClass('has-error');
			} else {
				$('#paid').closest('.form-group').addClass('has-success');
			} // /else

			if(discount == "") {
				$("#discount").after('<p class="text-danger"> The Discount field is required </p>');
				$('#discount').closest('.form-group').addClass('has-error');
			} else {
				$('#discount').closest('.form-group').addClass('has-success');
			} // /else

			if(paymentType == "") {
				$("#paymentType").after('<p class="text-danger"> The Payment Type field is required </p>');
				$('#paymentType').closest('.form-group').addClass('has-error');
			} else {
				$('#paymentType').closest('.form-group').addClass('has-success');
			} // /else

			if(paymentStatus == "") {
				$("#paymentStatus").after('<p class="text-danger"> The Payment Status field is required </p>');
				$('#paymentStatus').closest('.form-group').addClass('has-error');
			} else {
				$('#paymentStatus').closest('.form-group').addClass('has-success');
			} // /else


			// array validation
			var productName = document.getElementsByName('productName[]');				
			var validateProduct;
			for (var x = 0; x < productName.length; x++) {       			
				var productNameId = productName[x].id;	    	
		    if(productName[x].value == ''){	    		    	
		    	$("#"+productNameId+"").after('<p class="text-danger"> Product Name Field is required!! </p>');
		    	$("#"+productNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
	      } else {      	
		    	$("#"+productNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
	      }          
	   	} // for

	   	for (var x = 0; x < productName.length; x++) {       						
		    if(productName[x].value){	    		    		    	
		    	validateProduct = true;
	      } else {      	
		    	validateProduct = false;
	      }          
	   	} // for       		   	
	   	
	   	var quantity = document.getElementsByName('quantity[]');		   	
	   	var validateQuantity;
	   	for (var x = 0; x < quantity.length; x++) {       
	 			var quantityId = quantity[x].id;
		    if(quantity[x].value == ''){	    	
		    	$("#"+quantityId+"").after('<p class="text-danger"> Product Name Field is required!! </p>');
		    	$("#"+quantityId+"").closest('.form-group').addClass('has-error');	    		    		    	
	      } else {      	
		    	$("#"+quantityId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
	      } 
	   	}  // for

	   	for (var x = 0; x < quantity.length; x++) {       						
		    if(quantity[x].value){	    		    		    	
		    	validateQuantity = true;
	      } else {      	
		    	validateQuantity = false;
	      }          
	   	} // for       	
	   	

			// if(orderDate && clientName && clientContact && paid && discount && paymentType && paymentStatus) {
				if(orderDate && clientName && paid && discount && paymentType && paymentStatus) {

				if(validateProduct == true && validateQuantity == true) {
					// create order button
					// $("#createOrderBtn").button('loading');

					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// reset button
							$("#createOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
	            	'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            	'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	            	' <br /> <br /> <a type="button" onclick="printOrder('+response.order_id+')" class="btn btn-primary"> <i class="glyphicon glyphicon-print"></i> Print </a>'+
	            	'<a href="orders.php?o=add" class="btn btn-default" style="margin-left:10px;"> <i class="glyphicon glyphicon-plus-sign"></i> Add New Order </a>'+
	            	
	   		       '</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".submitButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeProductRowBtn").addClass('div-hide');
								
							} else {
								alert(response.messages);								
							}
						} // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			

			return false;
		}); // /create order form function	
	
	} else if(divRequest == 'manord') {
		// top nav child bar 
		$('#topNavManageOrder').addClass('active');

		manageOrderTable = $("#manageOrderTable").DataTable({
			'ajax': 'php_action/fetchOrder.php',
			'order': []
		});		
					
	} else if(divRequest == 'editOrd') {
		// $("#orderDate").datepicker();

		// edit order form function
		$("#editOrderForm").unbind('submit').bind('submit', function() {
			// alert('ok');
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var orderDate = $("#orderDate").val();
			var clientName = $("#clientName").val();
			// var clientContact = $("#clientContact").val();
			var paid = $("#paid").val();
			var discount = $("#discount").val();
			var paymentType = $("#paymentType").val();
			var paymentStatus = $("#paymentStatus").val();		

			// form validation 
			if(orderDate == "") {
				$("#orderDate").after('<p class="text-danger"> The Order Date field is required </p>');
				$('#orderDate').closest('.form-group').addClass('has-error');
			} else {
				$('#orderDate').closest('.form-group').addClass('has-success');
			} // /else

			if(clientName == "") {
				$("#clientName").after('<p class="text-danger"> The Client Name field is required </p>');
				$('#clientName').closest('.form-group').addClass('has-error');
			} else {
				$('#clientName').closest('.form-group').addClass('has-success');
			} // /else

			// if(clientContact == "") {
			// 	$("#clientContact").after('<p class="text-danger"> The Contact field is required </p>');
			// 	$('#clientContact').closest('.form-group').addClass('has-error');
			// } else {
			// 	$('#clientContact').closest('.form-group').addClass('has-success');
			// } // /else

			if(paid == "") {
				$("#paid").after('<p class="text-danger"> The Paid field is required </p>');
				$('#paid').closest('.form-group').addClass('has-error');
			} else {
				$('#paid').closest('.form-group').addClass('has-success');
			} // /else

			if(discount == "") {
				$("#discount").after('<p class="text-danger"> The Discount field is required </p>');
				$('#discount').closest('.form-group').addClass('has-error');
			} else {
				$('#discount').closest('.form-group').addClass('has-success');
			} // /else

			if(paymentType == "") {
				$("#paymentType").after('<p class="text-danger"> The Payment Type field is required </p>');
				$('#paymentType').closest('.form-group').addClass('has-error');
			} else {
				$('#paymentType').closest('.form-group').addClass('has-success');
			} // /else

			if(paymentStatus == "") {
				$("#paymentStatus").after('<p class="text-danger"> The Payment Status field is required </p>');
				$('#paymentStatus').closest('.form-group').addClass('has-error');
			} else {
				$('#paymentStatus').closest('.form-group').addClass('has-success');
			} // /else


			// array validation
			var productName = document.getElementsByName('productName[]');				
			var validateProduct;
			for (var x = 0; x < productName.length; x++) {       			
				var productNameId = productName[x].id;	    	
		    if(productName[x].value == ''){	    		    	
		    	$("#"+productNameId+"").after('<p class="text-danger"> Product Name Field is required!! </p>');
		    	$("#"+productNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
	      } else {      	
		    	$("#"+productNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
	      }          
	   	} // for

	   	for (var x = 0; x < productName.length; x++) {       						
		    if(productName[x].value){	    		    		    	
		    	validateProduct = true;
	      } else {      	
		    	validateProduct = false;
	      }          
	   	} // for       		   	
	   	
	   	var quantity = document.getElementsByName('quantity[]');		   	
	   	var validateQuantity;
	   	for (var x = 0; x < quantity.length; x++) {       
	 			var quantityId = quantity[x].id;
		    if(quantity[x].value == ''){	    	
		    	$("#"+quantityId+"").after('<p class="text-danger"> Product Name Field is required!! </p>');
		    	$("#"+quantityId+"").closest('.form-group').addClass('has-error');	    		    		    	
	      } else {      	
		    	$("#"+quantityId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
	      } 
	   	}  // for

	   	for (var x = 0; x < quantity.length; x++) {       						
		    if(quantity[x].value){	    		    		    	
		    	validateQuantity = true;
	      } else {      	
		    	validateQuantity = false;
	      }          
	   	} // for       	
	   	

			// if(orderDate && clientName && clientContact && paid && discount && paymentType && paymentStatus) {
				if(orderDate && clientName && paid && discount && paymentType && paymentStatus) {
				if(validateProduct == true && validateQuantity == true) {
					// create order button
					// $("#createOrderBtn").button('loading');

					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// reset button
							$("#editOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
	            	'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            	'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +	            		            		            	
	   		       '</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".editButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeProductRowBtn").addClass('div-hide');
								
							} else {
								alert(response.messages);								
							}
						} // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			

			return false;
		}); // /edit order form function	
	} 	

}); // /documernt


// print order function
function printOrder(orderId = null) {
	if(orderId) {		
			
		$.ajax({
			url: 'php_action/printOrder.php',
			type: 'post',
			data: {orderId: orderId},
			dataType: 'text',
			success:function(response) {
				
				var mywindow = window.open('', 'Stock Management System', 'height=400,width=600');
        mywindow.document.write('<html><head><title>Order Invoice</title>');        
        mywindow.document.write('</head><body>');
        mywindow.document.write(response);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10
        mywindow.resizeTo(screen.width, screen.height);
setTimeout(function() {
    // mywindow.print();
    // mywindow.close();
}, 1250);

        //mywindow.print();
        //mywindow.close();
				
			}// /success function
		}); // /ajax function to fetch the printable order
	} // /if orderId
} // /print order function

function addRow() {
    $("#addRowBtn").button("loading");

    var tableLength = $("#productTable tbody tr").length;

    var tableRow;
    var arrayNumber;
    var count;

    if (tableLength > 0) {
        tableRow = $("#productTable tbody tr:last").attr('id');
        arrayNumber = $("#productTable tbody tr:last").attr('class');
        count = tableRow.substring(3);
        count = Number(count) + 1;
        arrayNumber = Number(arrayNumber) + 1;
    } else {
        // No table row
        count = 1;
        arrayNumber = 0;
    }

    // Fetch product data using AJAX
    $.ajax({
        url: 'php_action/fetchProductData.php',
        type: 'post',
        dataType: 'json',
        success: function(response) {
            $("#addRowBtn").button("reset");

            // Create the new row HTML
            var tr = '<tr id="row' + count + '" class="' + arrayNumber + '">' +
                '<td>' +
                '<div class="form-group">' +
                '<select class="form-control select2" name="productName[]" id="productName' + count + '" onchange="getProductData(' + count + '); disableProductName(' + count + ')">' +
                '<option value="">~~SELECT~~</option>';

            // Add product options from response
            $.each(response, function(index, value) {
                tr += '<option value="' + value[0] + '">'+ value[1] +' - ' + value[7] +' - '+ value[8] +'</option>';  // value[0] is product_id, value[1] is product_name
            });

            tr += '</select>' +
                '</div>' +
                '</td>' +
                '<td style="padding-left:20px;">' +
                '<input type="text" name="rate[]" id="rate' + count + '" autocomplete="off" disabled="true" class="form-control" />' +
                '<input type="hidden" name="rateValue[]" id="rateValue' + count + '" autocomplete="off" class="form-control" />' +
                '</td>' +
                '<td style="padding-left:20px;">' +
                '<div class="form-group">' +
                '<p style="margin: 7px 20px 5px;"id="available_quantity' + count + '"></p>' +
                '</div>' +
                '</td>' +
                '<td style="padding-left:20px;">' +
                '<div class="form-group">' +
                '<input name="quantity[]" id="quantity' + count + '" onkeyup="getTotal(' + count + ')" autocomplete="off" class="form-control" min="1" />' +
                '</div>' +
                '</td>' +
                '<td style="padding-left:35px;">' +
                '<div class="form-group">' +
                '<input type="text" name="item_discount[]" id="item_discount' + count + '" onkeyup="getTotal(' + count + ')" autocomplete="off" class="form-control" value="0" min="0" max="100" oninput="validateNumberInput(this)"/>' +
                '</div>' +
                '</td>' +
                '<td style="padding-left:20px;">' +
                '<input type="text" name="total[]" id="total' + count + '" autocomplete="off" class="form-control" disabled="true" />' +
                '<input type="hidden" name="totalValue[]" id="totalValue' + count + '" autocomplete="off" class="form-control" />' +
                '</td>' +
                '<td>' +
                '<button style="padding: 9px 12px;"class="btn btn-default removeProductRowBtn" type="button" onclick="removeProductRow(' + count + ')"><i class="glyphicon glyphicon-trash"></i></button>' +
                '</td>' +
                '</tr>';

            // Add the new row to the table
            if (tableLength > 0) {
                $("#productTable tbody tr:last").after(tr);
            } else {
                $("#productTable tbody").append(tr);
            }

            // Initialize Select2 for the new select elements
            $('#productName' + count).select2({
                width: '100%',  // Ensure Select2 takes full width
                placeholder: "Select a product"
            });

            // Disable selected options in other rows' Select2 dropdowns
            setTimeout(function() {
                $('#productTable tbody tr').each(function() {
                    var existingProductId = $(this).find('select[name="productName[]"]').val();

                    // Loop through each option in the new select and hide those that are already selected
                    $('#productName' + count + ' option').each(function() {
                        var optionValue = $(this).val();
                        if (existingProductId && optionValue === existingProductId) {
                            $(this).prop('disabled', true);  // Disable the already selected option
                        }
                    });
                });
                
                // Refresh Select2 to reflect the changes in the dropdown (disabled options)
                $('#productName' + count).trigger('change.select2');
            }, 10);

			$(document).on('change', '#productName' + count, function() {
				var selectedProduct = $(this).val();
				if (selectedProduct !== '') {
					// Disable interaction with the select2 dropdown (simulating readonly behavior)
					$(this).next('.select2').css('pointer-events', 'none');  // Disable select2 dropdown interaction 
			
					// Ensure the Select2 container reflects the readonly style
					$(this).next('.select2').find('.select2-selection').css('background-color', '#eee'); // Set background color of select2's main box
			
					// Add additional styling to show it's readonly (e.g., dimming the dropdown)
					$(this).next('.select2').find('.select2-selection').css('opacity', '1');
					$(this).addClass('readonly');  // Optionally add class to the select for further styling
				}
			});
			
			
        }
    });
}




// Function to disable the product name dropdown only once a product is selected
function disableProductName(rowId) {
    var selectedProduct = $('#productName' + rowId).val();
    
    // If a valid product is selected, make the dropdown non-interactive
    if (selectedProduct && selectedProduct !== "") {
        $('#productName' + rowId).css({
            'pointer-events': 'none',  // Disable interaction with the dropdown
            'background-color': '#f0f0f0'  // Set the background color to light grey or any color of your choice
        });
    }
}


function removeProductRow(row = null) {
    if(row) {
        // Re-show the selected product in all rows
        var productIdToReenable = $('#productName' + row).val();
        
        // Loop through all rows and show the hidden option
        $('#productTable tbody tr').each(function() {
            $(this).find('option[value="' + productIdToReenable + '"]').show();
        });

        // Remove the row from the table
        $("#row" + row).remove();

        // Recalculate the subtotal or total amount
        subAmount();
    } else {
        alert('Error! Please refresh the page.');
    }
}





// // select on product data
// function getProductData(row = null) {

// 	if(row) {
// 		var productId = $("#productName"+row).val();		
		
// 		if(productId == "") {
// 			$("#rate"+row).val("");
// 			$("#quantity"+row).val("");						
// 			$("#total"+row).val("");

// 		} else {
// 			$.ajax({
// 				url: 'php_action/fetchSelectedProduct.php',
// 				type: 'post',
// 				data: {productId : productId},
// 				dataType: 'json',
// 				success:function(response) {
// 					// setting the rate value into the rate input field
// 					$("#rate"+row).val(response.rate);
// 					$("#rateValue"+row).val(response.rate);
				
// 					// Set the quantity input field to 1 (initial value)
// 					$("#quantity"+row).val(1);
					
// 					// Set the maximum quantity based on available quantity
// 					$("#quantity"+row).attr('max', response.quantity); // Set max attribute
					
// 					// Update the available quantity text
// 					$("#available_quantity"+row).text(response.quantity);
				
// 					// Calculate total price
// 					var total = Number(response.rate) * 1; // assuming quantity is 1 initially
// 					total = total.toFixed(2); // format to 2 decimal places
// 					$("#total"+row).val(total);
// 					$("#totalValue"+row).val(total);
				
// 					// Optional: If you want to trigger a recalculation when the quantity changes, use this
// 					$("#quantity"+row).on('input', function() {
// 						var quantity = $(this).val();
// 						// console.log("ww"+row);
// 						var q2= response.quantity;
// 						// console.log(q2);
						
// 						var quantity = parseInt($(this).val(), 10);  // Convert input to integer
// 						// console.log(quantity);
// 						var q2 = parseInt(response.quantity, 10);    // Convert response quantity to integer
// 						// console.log(q2);

// 						if(quantity > q2) {
// 							// console.log("true");
// 							$(this).val(q2); // Reset quantity to available max
// 						}
// 						var total = Number(response.rate) * quantity;
// 						total = total.toFixed(2);
// 						$("#total"+row).val(total);
// 						$("#totalValue"+row).val(total);
// 					});
				
// 					// Call the subAmount function if needed (assumed calculation for the total sum)
// 					subAmount();
// 				} // /success
				
// 			}); // /ajax function to fetch the product data	
// 		}
				
// 	} else {
// 		alert('no row! please refresh the page');
// 	}
// } // /select on product data






// select on product data
function getProductData(row = null) {
    if (row) {
        var productId = $("#productName" + row).val();

        if (productId == "") {
            $("#rate" + row).val("");
            $("#quantity" + row).val("");
            $("#total" + row).val("");
        } else {
            $.ajax({
                url: 'php_action/fetchSelectedProduct.php',
                type: 'post',
                data: { productId: productId, timestamp: new Date().getTime() }, // Adding timestamp for cache-busting
                dataType: 'json',
                cache: false, // Disable caching
                success: function (response) {
                    // setting the rate value into the rate input field
                    $("#rate" + row).val(response.rate);
                    $("#rateValue" + row).val(response.rate);

                    // Set the quantity input field to 1 (initial value)
                    $("#quantity" + row).val(1);

                    // Set the maximum quantity based on available quantity
                    $("#quantity" + row).attr('max', response.quantity); // Set max attribute

                    // Update the available quantity text
                    $("#available_quantity" + row).text(response.quantity);

                    // Calculate total price
                    var total = Number(response.rate) * 1; // assuming quantity is 1 initially
                    total = total.toFixed(2); // format to 2 decimal places
                    $("#total" + row).val(total);
                    $("#totalValue" + row).val(total);

                    // Optional: If you want to trigger a recalculation when the quantity changes, use this
                    $("#quantity" + row).on('input', function () {
                        var quantity = $(this).val();
                        var maxQuantity = response.quantity; // max available quantity

                        var quantityInt = parseInt($(this).val(), 10);  // Convert input to integer
                        var maxQuantityInt = parseInt(response.quantity, 10); // Convert available quantity to integer

                        if (quantityInt > maxQuantityInt) {
                            $(this).val(maxQuantityInt); // Reset quantity to available max
                        }
                        var total = Number(response.rate) * quantityInt;
                        total = total.toFixed(2); // Format total to 2 decimal places
                        $("#total" + row).val(total);
                        $("#totalValue" + row).val(total);
                    });

                    // Call the subAmount function if needed (assumed calculation for the total sum)
                    subAmount();
                } // /success
            }); // /ajax function to fetch the product data
        }

    } else {
        alert('no row! please refresh the page');
    }
} // /select on product data























































// table total
//////////////////////////////////////oldddddddddddddddddd//////////////////////////////////////////////////////////////
// function getTotal(row = null) {
// 	if(row) {
// 		var total = Number($("#rate"+row).val()) * Number($("#quantity"+row).val());
// 		total = total.toFixed(2);
// 		$("#total"+row).val(total);
// 		$("#totalValue"+row).val(total);
		
// 		subAmount();

// 	} else {
// 		alert('no row !! please refresh the page');
// 	}
// }
function getTotal(row) {
    if (row) {
        let rate = parseFloat($("#rate" + row).val()) || 0;
        let quantity = parseFloat($("#quantity" + row).val()) || 0;
        let itemDiscount = parseFloat($("#item_discount" + row).val()) || 0;

        let total = rate * quantity; // Calculate base total
        total -= (total * itemDiscount) / 100; // Apply discount
        total = total.toFixed(2);

        $("#total" + row).val(total); // Update total display
        $("#totalValue" + row).val(total); // Update hidden total
        subAmount(); // Update subtotal
    } else {
        alert('No row specified! Please refresh the page.');
    }
}

function subAmount() {
	var tableProductLength = $("#productTable tbody tr").length;
	var totalSubAmount = 0;
	for(x = 0; x < tableProductLength; x++) {
		var tr = $("#productTable tbody tr")[x];
		var count = $(tr).attr('id');
		count = count.substring(3);

		totalSubAmount = Number(totalSubAmount) + Number($("#total"+count).val());
	} // /for

	totalSubAmount = totalSubAmount.toFixed(2);

	// sub total
	$("#subTotal").val(totalSubAmount);
	$("#subTotalValue").val(totalSubAmount);

	// vat
	var vat = (Number($("#subTotal").val())/100) * 0;///////////////////enter gst value/////
	vat = vat.toFixed(2);
	$("#vat").val(vat);
	$("#vatValue").val(vat);

	// total amount
	var totalAmount = (Number($("#subTotal").val()) + Number($("#vat").val()));
	totalAmount = totalAmount.toFixed(2);
	$("#totalAmount").val(totalAmount);
	$("#totalAmountValue").val(totalAmount);

	var discount = $("#discount").val();
	if(discount) {
		var grandTotal = Number($("#totalAmount").val()) - Number(discount);
		grandTotal = grandTotal.toFixed(2);
		$("#grandTotal").val(grandTotal);
		$("#grandTotalValue").val(grandTotal);
	} else {
		$("#grandTotal").val(totalAmount);
		$("#grandTotalValue").val(totalAmount);
	} // /else discount	

	var paidAmount = $("#paid").val();
	if(paidAmount) {
		paidAmount =  Number($("#grandTotal").val()) - Number(paidAmount);
		paidAmount = paidAmount.toFixed(2);
		$("#due").val(paidAmount);
		$("#dueValue").val(paidAmount);
	} else {	
		$("#due").val($("#grandTotal").val());
		$("#dueValue").val($("#grandTotal").val());
	} // else

} // /sub total amount

function discountFunc() {
	var discount = $("#discount").val();
 	var totalAmount = Number($("#totalAmount").val());
 	totalAmount = totalAmount.toFixed(2);

 	var grandTotal;
 	if(totalAmount) { 	
 		grandTotal = Number($("#totalAmount").val()) - Number($("#discount").val());
 		grandTotal = grandTotal.toFixed(2);

 		$("#grandTotal").val(grandTotal);
 		$("#grandTotalValue").val(grandTotal);
 	} else {
 	}

 	var paid = $("#paid").val();

 	var dueAmount; 	
 	if(paid) {
 		dueAmount = Number($("#grandTotal").val()) - Number($("#paid").val());
 		dueAmount = dueAmount.toFixed(2);

 		$("#due").val(dueAmount);
 		$("#dueValue").val(dueAmount);
 	} else {
 		$("#due").val($("#grandTotal").val());
 		$("#dueValue").val($("#grandTotal").val());
 	}

} // /discount function

function paidAmount() {
	var grandTotal = $("#grandTotal").val();

	if(grandTotal) {
		var dueAmount = Number($("#grandTotal").val()) - Number($("#paid").val());
		dueAmount = dueAmount.toFixed(2);
		$("#due").val(dueAmount);
		$("#dueValue").val(dueAmount);
	} // /if
} // /paid amoutn function


function resetOrderForm() {
    // reset the input fields
    $("#createOrderForm")[0].reset();

    // reset Select2 dropdowns (clear the selection and trigger a change event)
    $('#createOrderForm .select2').each(function() {
        $(this).val(null).trigger('change');  // Reset Select2 dropdowns
    });

    // remove text-danger class (validation error messages)
    $(".text-danger").remove();

    // remove form-group error or success classes
    $(".form-group").removeClass('has-success').removeClass('has-error');
}



// remove order from server
function removeOrder(orderId = null) {
	if(orderId) {
		$("#removeOrderBtn").unbind('click').bind('click', function() {
			$("#removeOrderBtn").button('loading');

			$.ajax({
				url: 'php_action/removeOrder.php',
				type: 'post',
				data: {orderId : orderId},
				dataType: 'json',
				success:function(response) {
					$("#removeOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#removeOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert	          

					} else {
						// error messages
						$(".removeOrderMessages").html('<div class="alert alert-warning">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert	          
					} // /else

				} // /success
			});  // /ajax function to remove the order

		}); // /remove order button clicked
		

	} else {
		alert('error! refresh the page again');
	}
}
// /remove order from server

// Payment ORDER
function getProductData(row = null) {
    if (row) {
        var productId = $("#productName" + row).val();

        if (productId == "") {
            $("#rate" + row).val("");
            $("#quantity" + row).val("");
            $("#total" + row).val("");
        } else {
            $.ajax({
                url: 'php_action/fetchSelectedProduct.php',
                type: 'post',
                data: { productId: productId, timestamp: new Date().getTime() }, // Adding timestamp for cache-busting
                dataType: 'json',
                cache: false, // Disable caching
                success: function (response) {
                    // Setting the rate value into the rate input field
                    $("#rate" + row).val(response.rate);
                    $("#rateValue" + row).val(response.rate);

                    // Set the quantity input field to 1 (initial value)
                    $("#quantity" + row).val(1);

                    // Set the maximum quantity based on available quantity
                    $("#quantity" + row).attr('max', response.quantity); // Set max attribute

                    // Update the available quantity text
                    $("#available_quantity" + row).text(response.quantity);

                    // Calculate total price
                    var total = Number(response.rate) * 1; // assuming quantity is 1 initially
                    total = total.toFixed(2); // format to 2 decimal places
                    $("#total" + row).val(total);
                    $("#totalValue" + row).val(total);

                    // Only allow numeric input for quantity field (ID: quantity)
                    $("#quantity" + row).on('input', function () {
                        var quantity = $(this).val();
                        var maxQuantity = response.quantity; // max available quantity

                        // Check if the input contains only digits, and remove anything that's not a number
                        $(this).val(quantity.replace(/[^0-9]/g, ''));

                        // Convert the quantity to an integer
                        var quantityInt = parseInt($(this).val(), 10);

                        // Ensure quantity is within the available range
                        if (quantityInt > maxQuantity) {
                            $(this).val(maxQuantity); // Reset quantity to available max
                        }

                        // Recalculate the total
                        var total = Number(response.rate) * quantityInt;
                        total = total.toFixed(2); // Format total to 2 decimal places
                        $("#total" + row).val(total);
                        $("#totalValue" + row).val(total);
                    });

                    // Call the subAmount function if needed (assumed calculation for the total sum)
                    subAmount();
                } // /success
            }); // /ajax function to fetch the product data
        }

    } else {
        alert('no row! please refresh the page');
    }
} // /select on product data


function validateNumberInput(input) {
    // Remove any non-numeric characters (excluding decimal point)
    input.value = input.value.replace(/[^0-9]/g, '');
}



function validateDecimalInput(input) {
    // Allow only digits and a single decimal point
    input.value = input.value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point is allowed
    const decimalCount = (input.value.match(/\./g) || []).length;
    if (decimalCount > 1) {
        input.value = input.value.replace(/\.(?=.*\.)/, '');
    }

    // Add leading zero if the value starts with a decimal point (e.g., ".5" becomes "0.5")
    if (input.value.startsWith('.')) {
        input.value = '0' + input.value;
    }
}



// Payment ORDER
function paymentOrder(orderId = null) {
	if(orderId) {

		$("#orderDate").datepicker();

		$.ajax({
			url: 'php_action/fetchOrderData.php',
			type: 'post',
			data: {orderId: orderId},
			dataType: 'json',
			success:function(response) {				

				// due 
				$("#due").val(response.order[10]);				

				// pay amount 
				$("#payAmount").val(response.order[10]);

				var paidAmount = response.order[9] 
				var dueAmount = response.order[10];							
				var grandTotal = response.order[8];

				// update payment
				$("#updatePaymentOrderBtn").unbind('click').bind('click', function() {
					var payAmount = $("#payAmount").val();
					var paymentType = $("#paymentType").val();
					var paymentStatus = $("#paymentStatus").val();

					if(payAmount == "") {
						$("#payAmount").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#payAmount").closest('.form-group').addClass('has-error');
					} else {
						$("#payAmount").closest('.form-group').addClass('has-success');
					}

					if(paymentType == "") {
						$("#paymentType").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#paymentType").closest('.form-group').addClass('has-error');
					} else {
						$("#paymentType").closest('.form-group').addClass('has-success');
					}

					if(paymentStatus == "") {
						$("#paymentStatus").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#paymentStatus").closest('.form-group').addClass('has-error');
					} else {
						$("#paymentStatus").closest('.form-group').addClass('has-success');
					}

					if(payAmount && paymentType && paymentStatus) {
						$("#updatePaymentOrderBtn").button('loading');
						$.ajax({
							url: 'php_action/editPayment.php',
							type: 'post',
							data: {
								orderId: orderId,
								payAmount: payAmount,
								paymentType: paymentType,
								paymentStatus: paymentStatus,
								paidAmount: paidAmount,
								grandTotal: grandTotal
							},
							dataType: 'json',
							success:function(response) {
								$("#updatePaymentOrderBtn").button('loading');

								// remove error
								$('.text-danger').remove();
								$('.form-group').removeClass('has-error').removeClass('has-success');

								$("#paymentOrderModal").modal('hide');

								$("#success-messages").html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

								// remove the mesages
			          $(".alert-success").delay(500).show(10, function() {
									$(this).delay(3000).hide(10, function() {
										$(this).remove();
									});
								}); // /.alert	

			          // refresh the manage order table
								manageOrderTable.ajax.reload(null, false);

							} //

						});
					} // /if
						
					return false;
				}); // /update payment			

			} // /success
		}); // fetch order data
	} else {
		alert('Error ! Refresh the page again');
	}
}



