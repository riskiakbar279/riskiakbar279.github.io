window.mobilecheck = function () {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

function nl2br(str) {
	return str; //. replace(/(?:\ r\n|\r|\n)/g, '<br>');
}

function convertToSlug(str) {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}
$('#modal1').modal();
window.onhashchange = function () {
	let hash = window.location.hash;
	if (((hash != "#modal") && (hash != "modal"))) {
		$(".fsmodal").modal("close");
	}
};

$('#inc').click(function () {
	var curr_quantity = $(this).prev().val();
	curr_quantity = parseInt(curr_quantity) + 1;
	$(this).prev().val(curr_quantity);
});
$('#dec').click(function () {
	var curr_quantity = $(this).next().val();
	if (curr_quantity !== 0) {
		curr_quantity = parseInt(curr_quantity) - 1;
		$(this).next().val(curr_quantity);
	}
});


function addToCart(data) {
	// if(!localStorage.getItem("rlp:cart"))
	var cart = {};
	// 	localStorage.setItem("rlp:cart", JSON.stringify(cart));
	var exist = false;
	var index = -1;
	var cart = JSON.parse(localStorage.getItem("rlp:cart"));

	if (cart === null) {
		cart = {};
	}

	var id = $("#id").val();
	var quantity = parseInt($("#quantity").val());
	var name = $("#name").val();
	var weight = parseInt($("#weight").val());
	var price = $("#price").val();
	var note = $("#note").val();
	var products = {
		id: id,
		name: name,
		weight: weight,
		quantity: quantity,
		price: price,
		note: note
	};
	/*if(cart.length>0){
		$.each(cart,function(i,item){
			if(id==item.id){
				exist = true;
				var lastQuantity = item.quantity;
				index = i;
			}
		});
	}*/
	//if(cart){
	exist = cart.hasOwnProperty('p' + id);
	//}
	console.log(cart);
	if (exist) {
		cart["p" + id].quantity = cart["p" + id].quantity + quantity;
	} else {
		cart["p" + id] = products;
	}
	localStorage.setItem("rlp:cart", JSON.stringify(cart));
	console.log(cart);
	console.log(localStorage.getItem("rlp:cart"));
	location.href = base_url;
}

function show_order_form(el) {
	let $el = $(el);
	let $container = $el.parent();
	app.product.name = $container.find('.product-name').text();
	app.product.price = $container.find('.product-price').data('price');
	app.product.description = $el.data('description');
	app.product.stock = $el.data('stock');
	app.product.weight = $el.data('weight');
	app.product.id = $el.data('id');
	app.product.img = $container.find('.product-img').attr('src');
	if (app.cart["p" + app.product.id]) {
		console.log("q:" + app.cart["p" + app.product.id].quantity);
		app.product.quantity = app.cart["p" + app.product.id].quantity;
		app.product.note = app.cart["p" + app.product.id].note;
	} else {
		app.product.quantity = 0;
		app.product.note = '';
	}
}

function show_image_zoom(el) {
	let $el = $(el);
	let $container = $el.parent();
	app.product.name = $container.find('.product-name').text();
	app.product.price = $container.find('.product-price').data('price');
	app.product.description = $el.data('description');
	app.product.stock = $el.data('stock');
	app.product.weight = $el.data('weight');
	app.product.id = $el.data('id');
	app.product.img = $container.find('.product-img').attr('src');
	if (app.cart["p" + app.product.id]) {
		console.log("q:" + app.cart["p" + app.product.id].quantity);
		app.product.quantity = app.cart["p" + app.product.id].quantity;
		app.product.note = app.cart["p" + app.product.id].note;
	} else {
		app.product.quantity = 0;
		app.product.note = '';
	}
}

window.onscroll = function () {
	let botOfWindow = (window.innerHeight + window.pageYOffset ) >= (document.documentElement.offsetHeight - 300);//document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 250;
	//console.log((window.innerHeight + window.pageYOffset ));
	if (botOfWindow && app.products.length > app.limit) {
		app.limit += 10;
		//alert("x");
		setTimeout(function () {
			$('.card-1').matchHeight();
		}, 1000);

	}
}

var SORT_BY = {
    DEFAULT: 0,
    TERBARU: 1,
    TERLAMA: 2,
    TERMURAH: 3,
    TERMAHAL: 4,
}

var app = new Vue({
	el: "#app",
	data: {
		search: '',
		sort_by: SORT_BY.TERBARU,
		cat: '',
		products: [],
		product_variants: [],
		categories: [{
			id: "",
			category: "Semua",
			image: ""
		}],
		product: {
			id: 0,
			name: '',
			price: 0,
			nondiscount_price: 0,
			img: '',
			img2: '',
			img3: '',
			img4: '',
			img5: '',
			description: '',
			stock: 0,
			weight: '',
			quantity: 0,
			note: '',
			variant: {
				id: 0,
				name: ''
			}
		},
		cart: {},
		total: {
			price: 0,
			quantity: 0
		},
		limit: 10
	},
	computed: {
		productsInCategory() {
			setTimeout(function () {
				$('.card-1').matchHeight();
			}, 1000);
			if (this.cat === '') {
				return this.products;
			} else {
				return this.products.filter(item => {
					return item.kategori1 == app.cat
				})
			}
		},
		filteredItems() {
		    let self = this;
			return this.productsInCategory.filter(item => {
				return (item.nama_produk.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
			}).sort(function(a,b){
	            harga_a = (a.has_variant=='1') ? parseInt(a.min_price) : ((a.diskon!=0 && a.diskon<a.harga_jual) ? parseInt(a.diskon) : parseInt(a.harga_jual));
	            harga_b = (b.has_variant=='1') ? parseInt(b.min_price) : ((b.diskon!=0 && b.diskon<b.harga_jual) ? parseInt(b.diskon) : parseInt(b.harga_jual));
			    switch(self.sort_by){
			        case SORT_BY.TERBARU:
			            return b.id_produk - a.id_produk;
			            break;
			        case SORT_BY.TERLAMA:
			            return a.id_produk - b.id_produk;
			            break;
			        case SORT_BY.TERMURAH:
			            return harga_a - harga_b;
			            break;
			        case SORT_BY.TERMAHAL:
			            return harga_b - harga_a;
			            break;
			        default:
			            return b.id_produk - a.id_produk;
			    }
			}).slice(0, this.limit)
		},
		promo_products() {
		    let self = this;
			return this.products.filter(function items(item,index){
				if(item.diskon !==0 && item.diskon<item.harga_jual && item.has_variant==0){
				    item.p_id = index;
				    return true;
				}
				if(item.min_discount_price != 0 && item.has_variant==1){
				    item.p_id = index;
				    return true;
				}
			})
		}
	},
	methods: {
		share_product: function (id) {
			str = "Beli " + this.product.name;
			console.log(base_url + "p/" + id + "-" + convertToSlug(this.product.name));
			url = base_url + "p/" + id + "-" + convertToSlug(this.product.name);
			if(navigator.share!==undefined){
			    //alert(navigator.share);
			    navigator.share({
                    title: str,
                    text: str,
                    discription: str,
                    url: url,
                  }).then(() => console.log('Successful share'),
                error => {
                    store_share.product_share(str, base_url + "p/" + id + "-" + convertToSlug(this.product.name));
                });
			}else{
			    store_share.product_share(str, base_url + "p/" + id + "-" + convertToSlug(this.product.name));
			}
		},
		filter_by_cat: function (i) {
			this.cat = i
		},
		orderform: function (i,promo=false) {
		    console.log(promo);
			$('#modal1').modal({
				onOpenEnd: function () {
					// $("#modal1").css("top","0px");
					if (typeof cart_swiper !== 'undefined') {
						cart_swiper.update();
					}
				},
				onOpenStart: function () {
					window.location.hash = "modal";
				},
				onCloseStart: function () {
					if (window.location.hash == "#modal") {
						console.log("back");
						window.history.back();
					}
				}
			});
			$('#modal1').modal("open");
			if(base_url=="https://waroengbibit.online/"){
			    if(typeof fbq=="function"){
			        fbq("track","ViewContent");
			    }
			}
			if(promo==true){
			    p = this.products[i];
			    console.log(this.products[i])
			}else{
			    p = this.filteredItems[i];
			}
			//console.log(i);
			this.product.name = p.nama_produk;
			this.product.price = ((p.diskon != 0) && (p.harga_jual > p.diskon)) ? p.diskon : p.harga_jual;
			this.product.description = p.deskripsi;
			this.product.stock = p.stok;
			this.product.weight = parseInt(p.berat);
			this.product.id = p.id;
			this.product.img = (p.gambar) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar : '/assets/images/default-logo.png';
			this.product.img2 = (p.gambar2) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar2 : '/assets/images/default-logo.png';
			this.product.img3 = (p.gambar3) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar3 : '/assets/images/default-logo.png';
			this.product.img4 = (p.gambar4) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar4 : '/assets/images/default-logo.png';
			this.product.img5 = (p.gambar5) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar5 : '/assets/images/default-logo.png';
			if (this.cart["p" + this.product.id]) {
				//console.log("q:"+this.cart["p"+this.product.id].quantity);
				this.product.quantity = parseInt(this.cart["p" + this.product.id].quantity);
				this.product.note = this.cart["p" + this.product.id].note;
			} else {
				this.product.quantity = 0;
				this.product.note = '';
			}
		},
		zoomimage: function (i) {
			$(".modal").modal({
				dismissible: false
			});
			$("#modal2").modal("open");
			let p = this.filteredItems[i];
			//console.log(i);
			this.product.name = p.nama_produk;
			this.product.price = p.harga_jual;
			this.product.description = p.deskripsi;
			this.product.stock = p.stok;
			this.product.weight = parseInt(p.berat);
			this.product.id = p.id;

			this.product.img = (p.gambar) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar : '/assets/images/default-logo.png';
			this.product.img2 = (p.gambar2) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar2 : '/assets/images/default-logo.png';
			this.product.img3 = (p.gambar3) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar3 : '/assets/images/default-logo.png';
			this.product.img4 = (p.gambar4) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar4 : '/assets/images/default-logo.png';
			this.product.img5 = (p.gambar5) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar5 : '/assets/images/default-logo.png';
			if (this.cart["p" + this.product.id]) {
				//console.log("q:"+this.cart["p"+this.product.id].quantity);
				this.product.quantity = parseInt(this.cart["p" + this.product.id].quantity);
				this.product.note = this.cart["p" + this.product.id].note;
			} else {
				this.product.quantity = 0;
				this.product.note = '';
			}
		},
		clearSearch: function () {
			this.search = '';
		},
		reset_product: function () {
			this.product = {
				id: 0,
				name: '',
				price: 0,
			    nondiscount_price: 0,
				img: '',
				description: '',
				stock: 0,
				weight: '',
				quantity: 0,
				note: '',
				variant: {
					id: 0,
					name: ''
				}
			};
		},
		quantity_increase: function () {
			if (this.product.quantity >= this.product.stock) {
				this.product.quantity = this.product.stock;
				return;
			}
			this.product.quantity += 1;
		},
		quantity_decrease: function () {
			if (this.product.quantity <= 0) {
				this.product.quantity = 0;
				return;
			}
			this.product.quantity -= 1;
		},
		qty_increase: function (i) {
			if (this.cart['p' + i]) {
				this.cart['p' + i].quantity += 1;
			}
			this.reset_product();
			this.update_cart();
		},
		qty_decrease: function (i) {
			//console.log(i);
			if (this.cart['p' + i].quantity <= 1) {
				this.cart['p' + i].quantity = 0;
				delete this.cart["p" + i];
				this.reset_product();
				this.update_cart();
				return;
			}
			this.cart['p' + i].quantity -= 1;
			this.reset_product();
			this.update_cart();
		},
		show_variant_modal: function (i, product_id, promo=false) {
			console.log(product_id);

			let p = this.filteredItems[i];
			if(promo==true){
			    p = this.products[i];
			    console.log(this.products[i])
			}else{
			    p = this.filteredItems[i];
			}
			//console.log(i);
			this.product.name = p.nama_produk;
			this.product.price = p.max_price;
			this.product.description = p.deskripsi;
			this.product.stock = p.stok;
			this.product.weight = parseInt(p.berat);
			this.product.id = p.id;

			this.product.img = (p.gambar) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar : '/assets/images/default-logo.png';
			this.product.img2 = (p.gambar2) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar2 : '/assets/images/default-logo.png';
			this.product.img3 = (p.gambar3) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar3 : '/assets/images/default-logo.png';
			this.product.img4 = (p.gambar4) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar4 : '/assets/images/default-logo.png';
			this.product.img5 = (p.gambar5) ? pasar_url + 'uploads/' + p.id_toko + '/' + p.gambar5 : '/assets/images/default-logo.png';

			$('#modal_variasi').modal({
				onOpenEnd: function () {
					// $("#modal1").css("top","0px");
					if (typeof cart_swiper_varian !== 'undefined') {
						cart_swiper_varian.update();
					}
				},
				onOpenStart: function () {
					window.location.hash = "modal";
				},
				onCloseStart: function () {
					if (window.location.hash == "#modal") {
						console.log("back");
						window.history.back();
					}
				}
			});
			$('#modal_variasi').modal("open");			
// 			$modal.modal("open");
			self = this;
			getParams = {
				id: product_id
			}
			let params = new URLSearchParams(getParams).toString();
			fetch(base_url + "api/product/variants?" + params)
				.then(response => response.json())
				.then(result => {
					console.log(result);
					self.product_variants = result.data;
					$variants = $("input[name='variasi']");
					checked_index = $variants.index($variants.filter(':checked'));
					if(checked_index == -1){
					    self.select_variant(result.data.length - 1);
					}else{
					    self.select_variant(checked_index);
					}
				})
				.catch(error => {
					console.error('Error:', error);
				});
		},
		select_variant: function (i) {
			this.product.price = (this.product_variants[i].variant_discount_price > 0) ? parseInt(this.product_variants[i].variant_discount_price) : parseInt(this.product_variants[i].variant_price);
			this.product.nondiscount_price = parseInt(this.product_variants[i].variant_price);
			this.product.variant.id = this.product_variants[i].variant_id;
			this.product.variant.name = this.product_variants[i].variant_name;
			if(this.cart["p"+this.product.id].variant["v"+this.product.variant.id]){
			    this.product.quantity = this.cart["p"+this.product.id].variant["v"+this.product.variant.id].quantity
			}else{
			    this.product.quantity = 0;
			}
		},
		add_to_cart: function () {
			if (this.product.quantity <= 0) {
			    if(this.cart["p"+this.product.id].variant["v"+this.product.variant.id]){
    			    //this.product.quantity = this.cart["p"+this.product.id].variant["v"+this.product.variant.id].quantity;
    			    if(this.cart["p"+this.product.id].variant["v"+this.product.variant.length==1]){
        				if (this.cart["p" + this.product.id]) {
        					delete this.cart["p" + this.product.id];
        				}
    			    }else{
        				if (this.cart["p"+this.product.id].variant["v"+this.product.variant.id]) {
        					delete this.cart["p"+this.product.id].variant["v"+this.product.variant.id];
        				}
    			    }
    			}else{
    				if (this.cart["p" + this.product.id]) {
    					delete this.cart["p" + this.product.id];
    				}
    			}
			} else {
				let product = this.product;
				if(this.product.variant.id){
				    if(this.cart["p" + this.product.id]===undefined){
        				this.cart["p" + this.product.id] = {
        					id: this.product.id,
        					name: this.product.name,
        					price: this.product.price,
        					weight: this.product.weight,
        					quantity: 0,
        					note: this.product.note,
        					variant: {}
        				};
				    }
				    this.cart["p" + this.product.id].variant["v"+this.product.variant.id] = {
					    id: this.product.variant.id,
					    name: this.product.variant.name,
					    price: parseInt(this.product.price),
					    quantity: this.product.quantity
					}
					$.each(this.cart["p" + this.product.id].variant, (i,v)=>{
					    this.cart["p" + this.product.id].quantity += v.quantity;
					})
				}else{
    				this.cart["p" + this.product.id] = {
    					id: this.product.id,
    					name: this.product.name,
    					price: this.product.price,
    					weight: this.product.weight,
    					quantity: this.product.quantity,
    					note: this.product.note,
    				};
				}
			}
			this.reset_product();
			let q = 0;
			let price = 0;
			for (var k in this.cart) {
				if(this.cart[k].variant){
				    for(var v in this.cart[k].variant){
				        price += this.cart[k].variant[v].quantity * this.cart[k].variant[v].price;
				        q += this.cart[k].variant[v].quantity;
				    }
				}else{
				    price += this.cart[k].quantity * this.cart[k].price;
				    q += this.cart[k].quantity;
				}
			}
			localStorage.setItem("rlp:cart", JSON.stringify(this.cart));
			this.total.quantity = q;
			this.total.price = price;
		},
		direct_add_to_cart: function (i, index=false) {
		    
			if(index==true){
			    p = this.products[i];
			}else{
			    p = this.filteredItems[i];
			}
			
			console.log(index);
			//console.log(i);
			this.product.name = p.nama_produk;
			this.product.price = ((p.diskon != 0) && (p.harga_jual > p.diskon)) ? p.diskon : p.harga_jual; //p.harga_jual;
			this.product.description = p.deskripsi;
			this.product.stock = p.stok;
			this.product.weight = parseInt(p.berat);
			this.product.id = p.id;
			let product = this.product;
			this.cart["p" + this.product.id] = {
				id: this.product.id,
				name: this.product.name,
				price: this.product.price,
				weight: this.product.weight,
				quantity: 1,
				note: this.product.note,
			};
			this.reset_product();
			let q = 0;
			let price = 0;
			for (var k in this.cart) {
				q += this.cart[k].quantity;
				price += this.cart[k].quantity * this.cart[k].price;
			}
			localStorage.setItem("rlp:cart", JSON.stringify(this.cart));
			this.total.quantity = q;
			this.total.price = price;
		},
		update_cart: function () {
			this.reset_product();
			let q = 0;
			let price = 0;
			for (var k in this.cart) {
				if(this.cart[k].variant){
				    for(var v in this.cart[k].variant){
				        price += this.cart[k].variant[v].quantity * this.cart[k].variant[v].price;
				        q += this.cart[k].variant[v].quantity;
				    }
				}else{
				    price += this.cart[k].quantity * this.cart[k].price;
				    q += this.cart[k].quantity;
				}
			}
			localStorage.setItem("rlp:cart", JSON.stringify(this.cart));
			this.total.quantity = q;
			this.total.price = price;
		},
		remove_cart: function () {
			//console.log('remove');
			this.cart = {};
			localStorage.removeItem("rlp:cart")
		}
	},
	mounted() {
		/*if(!referrer.includes(base_url+'checkout')){
		  this.remove_cart();
		}*/
		if (window.products != false) {
			//console.log(true);
			this.products = window.products;
		}
		this.products.forEach((p, i) => {
			p.diskon = parseInt(p.diskon);
			p.harga_jual = parseInt(p.harga_jual);
		});
		if (window.categories != false) {
			// console.log(true);
			this.categories = this.categories.concat(window.categories);
		}
		this.categories.push({
			id: 0,
			category: "Lainnya",
			image: ""
		});
		if (localStorage.getItem("rlp:cart")) {
			let cart = JSON.parse(localStorage.getItem("rlp:cart"));
			let q = 0;
			let price = 0;
			for (var k in cart) {
				this.cart[k] = cart[k];
				if(this.cart[k].variant){
				    for(var v in this.cart[k].variant){
				        price += this.cart[k].variant[v].quantity * this.cart[k].variant[v].price;
				        q += this.cart[k].variant[v].quantity;
				    }
				}else{
				    price += this.cart[k].quantity * this.cart[k].price;
				    q += this.cart[k].quantity;
				}
			}
			this.total.quantity = q;
			this.total.price = price;
			this.reset_product();
		}
	}
});

$(function () {
    $("input[name='variasi']").on("change",function(e){
        console.log(this)
    })
    
    $("input[name='variasi']").change();
    
	$('#detail-gallery').lightGallery({
		thumbnail: true,
		pager: true,
		selector: 'a'
	});
	//x
	//$('#modalUlasan').modal('destroy');
	$('#modalUlasan,#modalStarRate').modal({
		onOpenEnd: function () {
			$(".fsmodal").css("top", "0px");
			console.log("OK");
		},
		onOpenStart: function () {
			window.location.hash = "modal";
			console.log("OK");
		},
		onCloseStart: function () {
			if (window.location.hash == "#modal") {
				console.log("back");
				window.history.back();
			}
		}
	});
	
	$("#modalMember").find("form").on("submit", (e) => {
	    e.preventDefault;
        let nama = $("input[name='first_name']").val().trim();
    	let hp = $("input[name='phone']").val().trim();
    	let alamat = $("input[name='alamat']").val().trim();
    	
    	let post_data = {
    	    name: nama,
    	    phone: hp,
    	    address: alamat
    	};
    	
    	console.log(post_data);
    	
    	$.post(base_url + "api/order/member", post_data, (res) => {
    		let protocol = (mobilecheck()) ? "whatsapp://" : "https://api.whatsapp.com/";
    	
    	    window.location = protocol+"send?phone=" + res.phone + "&text=" +  "Saya%20mau%20jadi%20member%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*Nomor*%20%3A%20" + encodeURIComponent(hp) + "%0A%0ATerimakasih";
    	});
	});	
})