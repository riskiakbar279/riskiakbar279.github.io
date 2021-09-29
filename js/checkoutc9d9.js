window.mobilecheck = function () {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

kurir = "cod";
paket = "cod";
ongkir = "0";
global_weight = 0;
firsttime = true;

$("#pembayaran").on({
	keyup: function () {
		$el = $(this);
		//$("#jumlah-pengeluaran").val($el.val());
		//$el.attr("type","text");
		$el.val(formatRupiah($el.val(), "Rp "));
	}
	//     focus: function() {
	//       $el = $(this);
	//       $el.val($("#jumlah-pengeluaran").val());
	//       $el.attr("type","number");
	//     },
	//     blur: function() {
	//       $el = $(this);
	//       $("#jumlah-pengeluaran").val($el.val());
	//       $el.attr("type","text");
	//       $el.val(formatRupiah($el.val(),"Rp "));
	//     }
});

function uangkembalian(el) {
	var pembayaran = $("#pembayaran").val().replace(/[^\d]/g, "");
	console.log(pembayaran);
	var total = $("#total").text();
	var result = parseInt(pembayaran) - parseInt(total);
	console.log(result);
	if (!isNaN(result)) {
		result = formatRupiah(result.toString(), "Rp ");
		$('#kembalian').val(result);
	}
}

function formatRupiah(angka, prefix) {
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
		split = number_string.split(','),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix === undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '');
}


function generate_courier_option(subdistrict, weight) {
	$("#courier").html('<option value="" disabled selected>Loading</option>');
	$.getJSON(base_url + "ajax/ongkir/" + subdistrict + "/" + weight, function (res) {
		$el = $("#courier");
		// $el.formSelect('destroy');
		//$el.html('<option value="" disabled selected>Pilih Kurir</option>');
		$el.html('');
		var v = {
			courier: "cod",
			service: "cod",
			cost: 0
		}
		// $el.append("<option value='"+JSON.stringify(v)+"'>Pilih Jasa Ekspedisi</option>");
		$el.append("<option value='" + JSON.stringify(v) + "'>Pilih Ekspedisi</option>");
		$.each(res.rajaongkir.results, function (i, item) {
			var kurir = item.code;
			$.each(item.costs, function (j, cost) {
				var costText = kurir.toUpperCase() + " - " + cost.service + ": " + format_rupiah(cost.cost[0].value, true);
				var v = {
					courier: kurir,
					service: cost.service,
					cost: cost.cost[0].value
				}
				$el.append("<option value='" + JSON.stringify(v) + "'>" + costText + "</option>");
			});
		});
		$("#courier").formSelect();
	});
}

var products = [];
var ongkir_msg = "ONGKIR : *" + format_rupiah(0) + "* \r\n";
var total_msg = "TOTAL : *" + format_rupiah(0) + "*";
var coupon_msg = "";
var coordinat = {long:0,lat:0};

$("form").eq(0).on("submit", (e) => {
	e.preventDefault;
	if(window.config_required_courier){
	    if(ongkir<=0 && $("input[name='is-kurir-toko']:checked").val()=="1"){
	        //alert('Anda belum memilih kurir.');
	        var toastHTML = '<span>Silahkan pilih Jasa Pengiriman terlebih dahulu!</span><button class="btn-flat toast-action">OK</button>';
            M.toast({html: toastHTML, classes: 'red lighten-1'});
	        return false;
	    }
	}
	if(base_url=="https://waroengdejava.com/"&&coordinat.long===0){
	        toastHTML = '<span>Silakan ijinkan Akses Lokasi untuk menghitung ongkir.</span><button class="btn-flat toast-action">OK</button>';
            M.toast({html: toastHTML, classes: 'red lighten-1'});
            get_location();
	        return false;
	}
	let $btn = $("#btn-order");
	if ($btn.text().trim() != "Pesan Sekarang") {
		return false;
	}
	$btn.text("Loading...");
	var tanggal = new Date();
	var bulan = ((tanggal.getMonth().length + 1) === 1) ? (tanggal.getMonth() + 1) : (tanggal.getMonth() + 1);
	var currentDate = tanggal.getDate() + "/" + bulan + "/" + tanggal.getFullYear();

	let nama = $("input[name='name']").val().trim();
	link = "http://www.google.com/maps/place/"+coordinat.lat+","+coordinat.long;
	let alamat = ($("input[name='address']").length) ? $("input[name='address']").val().trim() : link;
	let kelurahan = $("input[name='kelurahan']").val();
	let kodepos = $("input[name='postal-code']").val();

	if (kelurahan) {
		alamat = alamat + ", Kelurahan " + kelurahan
	}

	if (kodepos) {
		alamat = alamat + ", Kodepos " + kodepos
	}

	let store = $("input[name='store']").val().trim();
	let _products = $("input[name='products']").val().trim();
	let hp = $("input[name='phone']").val().trim();
	let note = $("textarea[name='description']").val().trim();
// 	let bank = $("[name='is-transfer']:checked").val();
	let bank = ($("input[name='template']").val() == "1") ? $("[name='is-kurir-toko']:checked").val() : $("[name='is-transfer']:checked").val();
	
	if (window.is_shipping) {
		prov = $("#prov option:selected").text();
		kab = $("#kab option:selected").text();
		kec = $("#kec option:selected").text();
		kodepos = $("input[name='postal-code']").val().trim();
	} else {
		prov = 1;
		kab = 1;
		kec = 1;
		kodepos = 1;
	}
	
// 	    cod_ongkir = "(Belum termasuk Ongkir)";
// 	    bank = "Pembayaran langsung sesuai kesepakatan";

if ($("input[name='template']").val() == "1") {	
	if (bank == undefined) {
		bank = $("[name='is-bank']:checked").val();
		cod_ongkir = "";
	}
	
	if ($("[name='is-transfer']:checked").val() =="1") {
		if (bank == 2) {
			bank = $("[name='is-bank']:checked").val();
		    cod_ongkir = "";
		}
	}	
	
	if (bank == 1) {
		bank = $("[name='is-bank']:checked").val();
		cod_ongkir = "";
	}
	if (bank == 2) {
		bank = $(".cod").text();
		cod_ongkir = $(".cod_toko").text();
	}
} else {
    if (bank == 1) {
		bank = $(".transfer").text();
		cod_ongkir = "";
	}else if (bank == 2) {
		bank = $(".cod").text();
		cod_ongkir = "";
	} else {
	    cod_ongkir = "(Belum termasuk Ongkir)";
	    bank = "Pembayaran langsung sesuai kesepakatan";
	}
}
	
	if (bank == 3) {
		bank = $(".cod").text();
		cod_ongkir = $(".kur_toko").text() +"\n(Belum Termasuk Ongkir)";
	}
	
	if (bank == 4) {
		bank = "Pembayaran langsung sesuai kesepakatan";
		cod_ongkir = "\nONGKIR : GOJEK\n(Belum Termasuk Ongkir)";
	}	
	
	if (bank == 5) {
		bank = "Pembayaran langsung sesuai kesepakatan";
		cod_ongkir = "\nONGKIR : GRAB\n(Belum Termasuk Ongkir)";
	}

	let metode_bayar = $("[name='is-transfer']:checked").val();
	if (metode_bayar === undefined) {
		metode_bayar = 2;
	}

	let post_data = {
		store: store,
		products: _products,
		name: nama,
		address: alamat,
		prov: prov,
		ongkir: ongkir,
		kodepos: kodepos,
		kurir: kurir,
		paket: paket,
		kab: kab,
		kec: kec,
		phone: hp,
		note: note,
		transfer: metode_bayar,
		coupon: $("p[id='coupon-code']").text().trim()
	};

	$.post(base_url + "api/order", post_data, (res) => {
		let protocol = (mobilecheck()) ? "whatsapp://send?phone=" : "https://api.whatsapp.com/send?phone=";
		if(base_url=="https://waroengdejava.com/"){
		    protocol = "https://wa.me/";
		}
		if (typeof fbq == "function") {
		    if(base_url=="https://waroengbibit.online/"){
			    fbq('track', 'Purchase');
		    }else{
			    fbq('track', 'Lead');
		    }
		}
		if(window.base_url=="https://ada-waroeng.com/"){
            greeting = "Halo AW...\r\n"
        }else if(window.base_url=="https://waroengdejava.com/"){
            greeting = "Halo admin Waroeng De Java\r\n";
        }else{
            greeting = "";
        }
		if ((window.is_shipping) && ($("[name='is-transfer']:checked").val() =="1")) {
			url = protocol + res.phone + "&text=" + encodeURIComponent(greeting) + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*Propinsi*%20%3A%20" + encodeURIComponent(prov) + "%0A*Kabupaten*%20%3A%20" + encodeURIComponent(kab) + "%0A*Kecamatan*%20%3A%20" + encodeURIComponent(kec) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(ongkir_msg) + encodeURIComponent(total_msg) + encodeURIComponent(coupon_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%0A%0ATerimakasih";
		} else if ((window.is_shipping) && ($("[name='is-transfer']:checked").val() =="2")) {
			url = protocol + res.phone + "&text=" + encodeURIComponent(greeting) + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*Propinsi*%20%3A%20" + encodeURIComponent(prov) + "%0A*Kabupaten*%20%3A%20" + encodeURIComponent(kab) + "%0A*Kecamatan*%20%3A%20" + encodeURIComponent(kec) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(cod_ongkir)  + "%0A*" + encodeURIComponent(total_msg) + encodeURIComponent(coupon_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%0A%0ATerimakasih";
		} else { 
		    if (window.base_url=="https://bahanpangan.com/") {
			url = protocol + res.phone + "&text=" + encodeURIComponent(greeting+"\r\n") + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*ID Pembeli*%20%3A%20" + encodeURIComponent(alamat) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(total_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%20" + encodeURIComponent(cod_ongkir) + "%0A%0ATerimakasih";
		    }else if(window.base_url=="https://waroengdejava.com/"){
			    url = protocol + res.phone + "?text=" + encodeURIComponent(greeting+"\r\n") + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(ongkir_msg) + encodeURIComponent(total_msg) + encodeURIComponent(coupon_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%20" + encodeURIComponent(cod_ongkir) + "%0A%0ATerimakasih";
            }else{
			    url = protocol + res.phone + "&text=" + encodeURIComponent(greeting+"\r\n") + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(total_msg) + encodeURIComponent(coupon_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%20" + encodeURIComponent(cod_ongkir) + "%0A%0ATerimakasih";
		    }
		}
		window.location = url;
	});
	$btn.text("  Pesan Sekarang");
});

$("#valid, #invalid").hide();

function whatsapp_text(greeting=""){
	if (window.is_shipping) {
		msg = encodeURIComponent(greeting) + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*Propinsi*%20%3A%20" + encodeURIComponent(prov) + "%0A*Kabupaten*%20%3A%20" + encodeURIComponent(kab) + "%0A*Kecamatan*%20%3A%20" + encodeURIComponent(kec) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(ongkir_msg) + encodeURIComponent(total_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%20" + encodeURIComponent(cod_ongkir) + "%0A%0ATerimakasih";
	} else {
		msg = encodeURIComponent(greeting+"\r\n") + "Saya%20mau%20belanja%0A%0A*Nama*%20%3A%20" + encodeURIComponent(nama) + "%0A*Alamat*%20%3A%20" + encodeURIComponent(alamat) + "%0A*HP*%20%3A%20" + encodeURIComponent(hp) + "%0A*Tanggal Order*%20%3A%20" + encodeURIComponent(currentDate) + "%0A%0A*Daftar%20Belanjaan*%0A" + encodeURIComponent(products.join('')) + encodeURIComponent(total_msg) + "%0A%0A*Catatan*%0A" + encodeURIComponent(note) + "%0A%0A*Pembayaran*%0A" + encodeURIComponent(bank) + "%20" + encodeURIComponent(cod_ongkir) + "%0A%0ATerimakasih";
	}
	return msg;
}

function check_coupon() {
	$("#valid,#invalid").hide();
	let coupon = $("p[id='coupon-code']").text().trim();
	if (coupon == '') {
		return false;
	} else {
		$.get(base_url + "api/coupon", {
			code: coupon,
			amount: data.price
		}, (res) => {
			data.discount = res.results.discount;
			$("#valid").show();
			$("#valid p").html("Selamat Anda mendapat diskon <b>"+format_rupiah(data.discount)+"</b> dari kupon yang digunakan.");
			total_msg = ("TOTAL : ~" + format_rupiah(ongkir + data.price) + "~ *" + format_rupiah(ongkir + data.price - data.discount) + "*");
			coupon_msg = "\r\nDISKON : *" + format_rupiah(data.discount) + "* \r\n";
			$("#total").html("" + format_rupiah(ongkir + data.price - data.discount) + "<br/><del style='font-size:.8em'>" + format_rupiah(ongkir + data.price) + "</del>");
			//console.log(data);
		}).fail(() => {
			total_msg = ("TOTAL : *" + format_rupiah(ongkir + data.price) + "*");
			$("#total").html("" + format_rupiah(ongkir + data.price));
			$("#invalid").show();
		});
	}
}

function set_coupon(code){
    $("p[id='coupon-code']").text(code);
    $("a[data-target='modal_promo'] button").text("Ganti Kupon");
    check_coupon();
}

function decrease_quantity(product_id,variant_id,quantity){
    if(quantity<=1){
        if(variant_id){
            //data.cart["p"+product_id].variant["v"+variant_id].quantity--;
            if(Object.keys(data.cart["p"+product_id].variant).length==1){
                if(Object.keys(data.cart).length==1){
                    localStorage.removeItem("rlp:cart");
                }
                delete data.cart["p"+product_id];
            }else{
                delete data.cart["p"+product_id].variant["v"+variant_id];
            }
        }else{
            if(Object.keys(data.cart).length==1){
                localStorage.removeItem("rlp:cart");
            }
            delete data.cart["p"+product_id];
        }
    }else{
        if(variant_id){
            data.cart["p"+product_id].variant["v"+variant_id].quantity--;
        }else{
            data.cart["p"+product_id].quantity--;
        }
    }
    localStorage.setItem("rlp:cart",JSON.stringify(data.cart));
    generate_cart_list();
    
	let coupon = $("p[id='coupon-code']").text().trim();
	if(coupon!=''){
	    check_coupon();
	}
	
	$("#courier").formSelect();
	generate_courier_option(data.subdistrict, global_weight);	
}

function increase_quantity(product_id,variant_id,quantity){
    if(variant_id){
        data.cart["p"+product_id].variant["v"+variant_id].quantity++;
    }else{
        data.cart["p"+product_id].quantity++;
    }
    localStorage.setItem("rlp:cart",JSON.stringify(data.cart));
    generate_cart_list();
    
	let coupon = $("p[id='coupon-code']").text().trim();
	if(coupon!=''){
	    check_coupon();
	}

	$("#courier").formSelect();
	generate_courier_option(data.subdistrict, global_weight);	
	
}

function generate_cart_list() {
    products = [];
	let cart_item_template = `<li style="height: 80px!important;" class="m-b-10">
								<div class="row m-0" style="padding: 5px;">
									<div class="col s12 p-0">
										<span style="font-size: 14px; line-height: 20px !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical;    display: -webkit-box; overflow: hidden;" class="title text-color product-name"><b>{{product_name}}</b></span>
									</div>
									<div class="col s8 p-0" style="padding-top: 5px!important;">
										<span class="title grey-text product-price" style="font-size: 16px;">{{price}}</span>
									</div>
									<div class="col s4 p-0 action" style="padding-right: 0px; padding-top: 5px!important;">
										<div class="center width-100" style="height: 30px; padding: 0px; font-size: 15px;">
											<div class="white-text" style="font-size: 15px;">
												<div class="dash_qty width-100 row" style="border: 1px solid rgb(16, 180, 173); border-radius: 10px; padding: 2px;">
													<div class="col s4 p-0">
														<a href="javascript:void(0)"><span class="bg-pasarsayur3 dash_minus" onclick="decrease_quantity({{product_id}},{{variant_id}},{{quantity}})">-</span></a>
													</div> 
													<div class="col s4 p-0">
														<span class="dash_count" style="height: 22px; line-height: 22px; font-size: 16px; width: 40px;">{{quantity}}</span>
													</div> 
													<div class="col s4 p-0">
														<a href="javascript:void(0)"><span class="bg-pasarsayur3 dash_plus" onclick="increase_quantity({{product_id}},{{variant_id}},{{quantity}})">+</span></a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div><hr>								
							</li>`;
    

    if (localStorage.getItem("rlp:cart")) {
    	let cart = JSON.parse(localStorage.getItem("rlp:cart"));
    	let q = 0;
    	let price = 0;
    	let weight = 0;
    	let no = 1;
    	$("#cart-wrapper").html("");
    	for (var k in cart) {
    		data.cart[k] = cart[k];
    		if(cart[k].hasOwnProperty("variant")){
    		    for(var v in cart[k].variant){
    		        q += cart[k].variant[v].quantity;
    		        price += cart[k].variant[v].quantity * cart[k].variant[v].price;
    		        weight += cart[k].variant[v].quantity * cart[k].weight;
        	        tmp = cart_item_template.replace(/{{quantity}}/g,cart[k].variant[v].quantity);
        	        tmp = tmp.replace("{{product_name}}",cart[k].name+" ("+cart[k].variant[v].name+")");
        	        tmp = tmp.replace("{{price}}",format_rupiah(cart[k].variant[v].quantity * cart[k].variant[v].price));
        	        tmp = tmp.replace(/{{product_id}}/g,cart[k].id);
        	        tmp = tmp.replace(/{{variant_id}}/g,cart[k].variant[v].id);
    		        $("#cart-wrapper").append(tmp);
    		        tmp = "*" + no + ". " + data.cart[k].name + " (" + cart[k].variant[v].name + ")" + "*\r\n  Jumlah : " + cart[k].variant[v].quantity + "\r\n  Harga (@) : " + format_rupiah(cart[k].variant[v].price, true) + "\r\n  Total Harga : " + format_rupiah((cart[k].variant[v].price * cart[k].variant[v].quantity)) + "\r\n\r\n";
    		        products.push(tmp);
    		        no++;
    		    }
    		}else{
        		q += cart[k].quantity;
        		price += cart[k].quantity * cart[k].price;
        		weight += cart[k].quantity * cart[k].weight;
    	        tmp = cart_item_template.replace(/{{quantity}}/g,cart[k].quantity);
    	        tmp = tmp.replace("{{product_name}}",cart[k].name);
    	        tmp = tmp.replace("{{price}}",format_rupiah(cart[k].quantity * cart[k].price));
    	        tmp = tmp.replace(/{{product_id}}/g,cart[k].id);
    	        tmp = tmp.replace(/{{variant_id}}/g,0);
    	    	$("#cart-wrapper").append(tmp);
    	    	tmp = "*" + no + ". " + data.cart[k].name + "*\r\n  Jumlah : " + data.cart[k].quantity + "\r\n  Harga (@) : " + format_rupiah(data.cart[k].price, true) + "\r\n  Total Harga : " + format_rupiah((data.cart[k].price * data.cart[k].quantity)) + "\r\n\r\n";
    	    	products.push(tmp);
    	    	no++;
    		}
    	}
    	data.quantity = q;
    	data.price = price;
    	data.weight = weight;
    	global_weight = weight;
    	$("input[name='products']").val(JSON.stringify(data.cart));
		total_msg = ("TOTAL : *" + format_rupiah(data.price) + "*");
    	

        if (data.quantity <= 0) {
        	//empty cart
        	$("#empty-cart").show();
        	$("#address-div").hide();
        } else {
        	$("#address-div").show();
        
        	no = 1;
        	
        	$("#subtotal").text(format_rupiah(data.price));
        	$("#weight").text(format_rupiah(data.weight, true));
        	$("#ongkir").text(format_rupiah(0, true));
        	$("#total").text(format_rupiah(data.price));
        }
    }
}

let data = {
	cart: {},
	quantity: 0,
	price: 0,
	weight: 0,
	subdistrict: 0,
	kurir: "",
	service: "",
	discount: 0
}

$(document).ready(function () {
    
	if (typeof fbq == "function") {
	    if(base_url=="https://waroengbibit.online/"){
		    fbq('track', 'AddToCart');
	    }
	}
		
    generate_cart_list();
    
	$("#phone").attr({
		placeholder: 'xxxx - xxxx - xxxx'
	});
  	
	$("#phone").on("keyup", function (e) {
		if (e.which == 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
		$(this).val($(this).val().replace(/[^0-9^-]/g, ''));
		var last = $(this).val().substr($(this).val().indexOf("-") + 1);

		if (last.length == 4) {
			var first = $(this).val();
			$(this).val(first + '-');
		}
	});
	
	$("#prov").on("change", function () {
		if (window.khusus_kab) {
			var value_kab = window.khusus_kab;
			$("#postal-code-wrap").hide();
			$("#kelurahan-wrap").show();
		} else {
			var value_kab = localStorage.getItem('kab');
		}
		$("#kab").html("<option>Loading...</option>");
		$("#kab").select();
		$.getJSON(base_url + "wilayah/kabupaten/" + $(this).val(), function (result) {
			data_get = result.results;
			$("#kab").html("<option value=''>Pilih Kabupaten/Kota</option>");
			$("#kab").select();
			$.each(data_get, function (i, item) {
				if (window.khusus_kab) {
					if (item.city_id == window.khusus_kab) {
						$("#kab").append("<option value='" + item.city_id + "'>" + item.type + " " + item.city_name + "</option>");
					}
				} else {
					$("#kab").append("<option value='" + item.city_id + "'>" + item.type + " " + item.city_name + "</option>");
				}
			});
			if (value_kab && firsttime) {
				$("#kab").val(value_kab);
			}
			$("#kab").change();
			$("#kab").select();
		});
	});
	
	$("#kab").on("change", function () {
		if ($(this).val() == "") {
			$("#kec").html("<option value=''>Pilih Kecamatan</option>");
			$("#kec").select();
			return;
		}
		$("#kec").html("<option>Loading...</option>");
		$("#kec").select();
		$.getJSON(base_url + "wilayah/kecamatan/" + $(this).val(), function (result) {
			data_get = result.results;
			$("#kec").html("<option value=''>Pilih Kecamatan</option>");
			$.each(data_get, function (i, item) {
				$("#kec").append("<option value='" + item.subdistrict_id + "'>" + item.subdistrict_name + "</option>");
			});

			if (firsttime) {
				$("#kec").val(localStorage.getItem('kec'));
				firsttime = false;
			}
			$("#kec").change();
			$("#kec").select();
		});
	});
	
	var value_name = localStorage.getItem('name');
	var value_phone = localStorage.getItem('phone');
	var value_address = localStorage.getItem('address');
	if (window.khusus_prov) {
		var value_prov = window.khusus_prov;
	} else {
		var value_prov = localStorage.getItem('prov');
	}
	if (window.khusus_kab) {
		var value_kab = window.khusus_kab;
	} else {
		var value_kab = localStorage.getItem('kab');
	}
	var value_kec = localStorage.getItem('kec');
	var value_postal_code = localStorage.getItem('postal_code');

	$('#name').val(value_name);
	$('#phone').val(value_phone);
	$('#address').val(value_address);
	$('#prov').val(value_prov);
	$('#prov').change();
	$('#kab').val(value_kab);
	$('#kec').val(value_kec);
	$('#postal-code').val(value_postal_code);
	
	$("#kec").change(function () {
		data.subdistrict = $("#kec option:selected").val();
		data.weight = $("#weight").html();
		console.log(data.subdistrict);
		//Hitung Ongkir
		$("#courier").formSelect();
		generate_courier_option(data.subdistrict, global_weight);
	});
	
	$('#textarea').show(function () {
		$(this).css("height", "95px");
	});
	
	$(document).ready(function() { 
	if ($("input[name='template']").val() == "1") {	
	
    $( ".bank_name" ).each(function(index) {
		let bank_name = $(this).val().trim();
		console.log(bank_name)
		if ((bank_name =="MANDIRI") || (bank_name =="BANK MANDIRI")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/mandiri.svg">');	
		} else if ((bank_name =="MANDIRI SYARIAH")|| (bank_name =="BANK MANDIRI SYARIAH")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/mandiri_syariah.svg">');	
		} else if ((bank_name =="BRI") || (bank_name =="BANK BRI")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bri.svg">');	
		} else if ((bank_name == "BRI SYARIAH") || (bank_name =="BANK BRI SYARIAH")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bri_syariah.svg">');	
		} else if ((bank_name =="BCA") || (bank_name =="BANK BCA")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bca.svg">');	
		} else if ((bank_name =="BJB") || (bank_name =="BANK BJB")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bjb.svg">');	
		} else if ((bank_name =="BNI") || (bank_name =="BANK BNI")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bni.svg">');	
		} else if ((bank_name =="BNI SYARIAH") || (bank_name =="BANK BNI SYARIAH")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bni_syariah.svg">');	
		} else if ((bank_name =="BTN") || (bank_name =="BANK BTN")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/btn.svg">');	
		} else if ((bank_name =="BUKOPIN") || (bank_name =="BANK BUKOPIN")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/bukopin.svg">');	
		} else if ((bank_name =="CIMB") || (bank_name =="CIMB NIAGA")|| (bank_name =="BANK CIMB") || (bank_name =="BANK CIMB NIAGA")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/cimb.svg">');	
		} else if ((bank_name =="JENIUS") || (bank_name =="BTPN") || (bank_name =="BANK BTPN") || (bank_name =="BANK JENIUS")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/jenius.svg">');	
		} else if ((bank_name =="PERMATA") || (bank_name =="BANK PERMATA")) {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank/permata.svg">');	
		} else {
			let image_bank = "image_bank"+(index+1);
			$("."+image_bank).append('<img style="width: 100%;" src="asset2/img/icon/bank.svg">');	
			console.log(image_bank)
		}

	});		
	
	
	if ($("[name='is-transfer']:checked").val() =="1") {
		$("label[for='transfer_bank']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='transfer_bank']").css('border-radius', '15px');
	}

	if ($("[name='is-transfer']:checked").val() =="2") {
		$("label[for='ditempat_cod']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='ditempat_cod']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="1") {
		$("label[for='ekspedisi']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='ekspedisi']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="2") {
		$("label[for='select_cod_toko']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='select_cod_toko']").css('border-radius', '15px');
	}



	if ($("[name='is-transfer']:checked").val() =="1") {
		$("#transfer").collapsible("open");
		$("#kurir-ekspedisi").collapsible("open");

		$("#cod").collapsible("close");	


		if ($("input[name='is-bank']").attr('data') =="1") {
			$("input[name='is-bank']").prop("checked", true);
		}
		
		$("#ekspedisi").prop("checked", true);
		$("#select_cod_toko").prop("disabled",true);
		$("#ekspedisi").prop("disabled",false);

		$("#cod_toko_wrap").show();
		$("#cod_toko_wrap").siblings().hide();

	} else {
		$("#transfer").collapsible("close");
		$("#cod").collapsible("open");
		$("#kurir-ekspedisi").collapsible("close");

		
		$("#select_cod_toko").prop("checked", true);
		$("#ekspedisi").prop("disabled",true);
		$("#select_cod_toko").prop("disabled",false);
		
		$("#cod_toko_wrap").show();
		$("#cod_toko_wrap").siblings().show();
	
		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);	
	}

$("input[name='is-transfer']").on("change",function(e){

	if ($("[name='is-transfer']:checked").val() =="1") {
		$("label[for='transfer_bank']").css('border-radius', '15px 15px 0 0');
		$("label[for='ekspedisi']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='transfer_bank']").css('border-radius', '15px');
		$("label[for='ekspedisi']").css('border-radius', '15px');
	}

	if ($("[name='is-transfer']:checked").val() =="2") {
		$("label[for='ditempat_cod']").css('border-radius', '15px 15px 0 0');
		$("label[for='select_cod_toko']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='ditempat_cod']").css('border-radius', '15px');
		$("label[for='select_cod_toko']").css('border-radius', '15px');
	}


	let $this = $(e.currentTarget);
	if ($this.val() == "1") {
		$("#transfer").collapsible("open");
		$("#kurir-ekspedisi").collapsible("open");

		$("#cod").collapsible("close");
		$("#note_cod_toko").collapsible("close");


		if ($("input[name='is-bank']").attr('data') =="1") {
			$("input[name='is-bank']").prop("checked", true);
		}

		$("#ekspedisi").prop("checked", true);
		$("#select_cod_toko").prop("disabled",true);
		$("#ekspedisi").prop("disabled",false);

		$("#cod_toko_wrap").show();
		$("#cod_toko_wrap").siblings().hide();

	} else {
		if ($("[name='is-kurir-toko']:checked").val() =="3") {
			$("label[for='kur_toko']").css('border-radius', '15px 15px 0 0');
		} else {
			$("label[for='kur_toko']").css('border-radius', '15px');
		}

		if ($("[name='is-kurir-toko']:checked").val() =="4") {
			$("label[for='gojek']").css('border-radius', '15px 15px 0 0');
		} else {
			$("label[for='gojek']").css('border-radius', '15px');
		}

		if ($("[name='is-kurir-toko']:checked").val() =="5") {
			$("label[for='grab']").css('border-radius', '15px 15px 0 0');
		} else {
			$("label[for='grab']").css('border-radius', '15px');
		}	

		$("#note_cod_toko").parent().siblings().children(".collapsible").collapsible("close");

		$("#transfer").collapsible("close");
		$("#cod").collapsible("open");
		$("#kurir-ekspedisi").collapsible("close");
		$("#note_cod_toko").collapsible("open");	

		
		$("#select_cod_toko").prop("checked", true);
		$("#ekspedisi").prop("disabled",true);
		$("#select_cod_toko").prop("disabled",false);
		
		$("#cod_toko_wrap").show();
		$("#cod_toko_wrap").siblings().show();

		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);		
	} 	
});

$("input[name='is-kurir-toko']").on("change",function(e){
	if ($("[name='is-kurir-toko']:checked").val() =="1") {
		$("label[for='ekspedisi']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='ekspedisi']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="2") {
		$("label[for='select_cod_toko']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='select_cod_toko']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="3") {
		$("label[for='kur_toko']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='kur_toko']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="4") {
		$("label[for='gojek']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='gojek']").css('border-radius', '15px');
	}

	if ($("[name='is-kurir-toko']:checked").val() =="5") {
		$("label[for='grab']").css('border-radius', '15px 15px 0 0');
	} else {
		$("label[for='grab']").css('border-radius', '15px');
	}		

	let $this = $(e.currentTarget);
	if ($this.val() == "1") {
		$("#kurir-ekspedisi").collapsible("open");
	} else if ($this.val() == "2") {
		$("#note_cod_toko").collapsible("open");
		$("#note_cod_toko").parent().siblings().children(".collapsible").collapsible("close");	

		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);			
	} else if ($this.val() == "3") {
		$("#kurir-toko").collapsible("open");		
		$("#kurir-toko").parent().siblings().children(".collapsible").collapsible("close");
	
		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);			
	} else if ($this.val() == "4") {
		$("#note_gojek").collapsible("open");
		$("#note_gojek").parent().siblings().children(".collapsible").collapsible("close");
	
		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);			
	} else {
		$("#note_grab").collapsible("open");
		$("#note_grab").parent().siblings().children(".collapsible").collapsible("close");
	
		$("#ongkir").text(0);
		$("#total").text(format_rupiah(data.price),true);
		ongkir_msg = ("ONGKIR  : *"+format_rupiah(0)+"*\r\n")
		total_msg = ("TOTAL : *"+format_rupiah(data.price)+"*");
		$('#courier').prop('selectedIndex', 0);			
	}
});

} else{ $("input[name='is-transfer']").on("change", function (e) {
		let $this = $(e.currentTarget);
		let $oca = $("#transfer");
		let $nca = $("#cod");
		let $oc = $("#kurir-toko");
		let $nc = $("#kurir-ekspedisi");
		if ($this.val() == 1) {
			$oca.show();

			$oca.find("input,select").prop("required", true);
			$oca.find("input,select").prop("disabled", false);
			$nca.hide();
			$nca.find("input,select").prop("required", false);
			$nca.find("input,select").prop("disabled", true);

			if (window.is_shipping) {
				$oc.hide();
				$oc.find("input,select").prop("required", false);
				$oc.find("input,select").prop("disabled", true);
				$nc.show();
				$nc.find("input,select").prop("required", true);
				$nc.find("input,select").prop("disabled", false);

				$("#option2").prop("checked", true);
				$("#option1").removeAttr("checked", "checked");

				$("#option1").prop("disabled", true);
				$("#option2").removeAttr("disabled", "disabled");
			}

		} else {

			if (window.is_shipping) {
				$('#courier').prop('selectedIndex', 0);
				$('#courier').each(function () {
					$(this).removeAttr('selected');
				})
				$oc.show();
				ongkir = "";
				$oc.find("input,select").prop("required", true);
				$oc.find("input,select").prop("disabled", false);
				$nc.hide();
				$nc.find("input,select").prop("required", false);
				$nc.find("input,select").prop("disabled", true);
				$("#ongkir").text(0);
				$("#total").text(format_rupiah(data.price), true);
				ongkir_msg = ("ONGKIR  : *" + format_rupiah(0) + "*\r\n")
				total_msg = ("TOTAL : *" + format_rupiah(data.price) + "*");

				$("#option2").prop("disabled", true);
				$("#option1").removeAttr("disabled", "disabled");
				$("#option1").prop("checked", true);
				$("#option2").removeAttr("checked", "checked");
			}

			$oca.hide();
			$oca.find("input,select").prop("required", false);
			$oca.find("input,select").prop("disabled", true);
			$nca.show();
			$nca.find("input,select").prop("required", true);
			$nca.find("input,select").prop("disabled", false);
		}
	});
}

});

	$('#btn-order').on('click', function () {
		var name = $("#name").val();
		var phone = $("#phone").val();
		var address = $("#address").val();
		var prov = $("#prov").val();
		var kab = $("#kab").val();
		var kec = $("#kec").val();
		var postal_code = $("#postal-code").val();

		localStorage.setItem('name', name);
		localStorage.setItem('phone', phone);
		localStorage.setItem('address', address);
		localStorage.setItem('prov', prov);
		localStorage.setItem('kab', kab);
		localStorage.setItem('kec', kec);
		localStorage.setItem('postal_code', '');
	});
	
	$('.btn-order').on('click', function () {
		var name = $("#name").val();
		var phone = $("#phone").val();
		var address = $("#address").val();
		var prov = $("#prov").val();
		var kab = $("#kab").val();
		var kec = $("#kec").val();
		var postal_code = $("#postal-code").val();

		localStorage.setItem('name', name);
		localStorage.setItem('phone', phone);
		localStorage.setItem('address', address);
		localStorage.setItem('prov', prov);
		localStorage.setItem('kab', kab);
		localStorage.setItem('kec', kec);
		localStorage.setItem('postal_code', '');
	});	
	
	$("#courier").on("change", function (e) {
		if ($("#courier").val().length > 0) {
			let courier = JSON.parse($("#courier").val());
			kurir = courier.courier;
			paket = courier.service;
			ongkir = courier.cost;
			$("#ongkir").text(format_rupiah(courier.cost, true));
			console.log(data);
			$("#total").text(format_rupiah(courier.cost + data.price), true);

			ongkir_msg = ("ONGKIR  : *" + courier.courier + " - " + courier.service + " : " + format_rupiah(courier.cost) + "*\r\n");
			total_msg = ("TOTAL : *" + format_rupiah(courier.cost + data.price) + "*");

			// 	$("html, body").animate({ scrollTop: $(document).height()-$(window).height() },1000);
			$("button[type='submit']").removeAttr("disabled");
			(courier.courier == 'cod') ? $("#shipping-status-div").hide(): $("#shipping-status-div").show();
			check_coupon();
		}
	});
})

get_location = () => {
    x = document.getElementById("alert");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            //x.style.display = "block";
            var long = position.coords.longitude;
            var lat = position.coords.latitude;
            coordinat.long = long;
            coordinat.lat = lat;
            // document.getElementById("long").value = long;
            // document.getElementById("lat").value = lat;
            x.innerHTML = "Long: "+long+"; Lat: "+lat;
            $.get(base_url+"api/shipping",{
                long: long,
                lat: lat
            },function(res){
                link = "http://www.google.com/maps/place/"+lat+","+long;
                $("#alert").text("Jarak Anda "+res.results.distance+" km");
    			kurir = "Kurir Sendiri";
    			paket = "-";
    			ongkir = res.results.fee;
    			$("#ongkir").text(format_rupiah(ongkir, true));
    			//console.log(data);
    			$("#total").text(format_rupiah(ongkir + data.price), true);
    
    			ongkir_msg = ("ONGKIR  : *" + format_rupiah(ongkir) + "*\r\n");
    			total_msg = ("TOTAL : *" + format_rupiah(ongkir + data.price) + "*\r\n\r\nTolong kirim ke alamat saya "+link+"\r\n");
            })
        },(error)=>{
    x.style.display = "block";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "Tidak dapat mengakses GPS. w("+error.code+")";
                    if(attempt <3){
                        attempt++;
                        revokePermission();
                    }
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Tidak dapat mengakses GPS. x("+error.code+")";
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "Tidak dapat mengakses GPS. y("+error.code+")";
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "Tidak dapat mengakses GPS. z("+error.code+")";
                    break;
            }   
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
        $("#alert").html("! GPS Tidak Terdeteksi")
        $("#alert").show();
    }
}