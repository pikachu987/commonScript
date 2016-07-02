# Crop
### JavaScript

Quick Util JavaScript
####platform
####browser
####isNewOpen
####array remove
####replace
####comma


## Example

**Create .html**

**add jQuery.js**

**add common.js**

~~~~


<div id="util"></div><br>
<div id="replace"></div><br>
<div id="commaPrice"></div><br>
<div id="list"></div>


<script type="text/javascript">
$(document).ready(function(){
    /** util Test **/
    var util = $.util();
    var platform = util.platform;
    var browser = util.browser;
    var newOpen = util.newOpen;
    $('#util').append('platform = '+platform);
    $('#util').append('<br>browser = '+browser);
    $('#util').append('<br>newOpen = '+newOpen);




    /** createForm, createInput Test **/
    var form = $.createForm('put');
    $.createInput(form,'foo','bar');
    $.createInput(form,'boo','bar2');


    /** ajax Test **/
    // jQuery.ajaxFnImage(url,form,method,function(data){
    // 	console.log(data);
    // },false);
    // jQuery.ajaxFn(url,form,method,function(data){
    // 	console.log(data);
    // },false);


    /** replaceAll Test **/
    var text = 'hello javascript world';
    var replaceText = text.replace('javascript', 'jQuery');
    $('#replace').html('replaceText = '+replaceText);


    /** setPriceComma Test **/
    var price = '111222333444';
    var commaPrice = price.setPriceComma();
    $('#commaPrice').html('commaPrice = '+commaPrice);


    /** list remove Test **/
    var array = ['foo', 'boo', 'coo?', 'doo?'];
    array.remove(2);
    $('#list').html(JSON.stringify(array));
});
</script>
~~~~

##Image

###chromeTest Image
![Alt text](/exampleImages/chromeTest.png)

###safariTest Image
![Alt text](/exampleImages/safariTest.png)


## Author

pikachu987, pikachu987@naver.com

## License

Crop is available under the MIT license. See the LICENSE file for more info.
