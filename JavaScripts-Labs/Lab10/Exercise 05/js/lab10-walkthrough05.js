/* put your DOM code here */
$(function	()	{						
//	create	a	new	DOM	element	
var	img	=	$('<img	src="images/art/thumbs/13030.jpg"	>');					
//	and	now	add_the_new_element_after_the_panel	
var	panel	=	$('.panel');							
img.insertBefore(panel);			
});
