const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".explore__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".explore__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".explore__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".explore__content .explore__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".chef__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".chef__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".chef__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".chef__list li", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

$(document).ready(function () {
  var itemCount = 0;

  $(".add-to-cart").click(function () {
    var name = $(this).data("name");
    var price = $(this).data("price");
    var itemHTML = "<li>" + name + " - $" + price + "</li>";
    $("#cart-items").append(itemHTML);
    itemCount++;
    $("#cart-count").text(itemCount);
  });

  $("#shopping-cart-btn").click(function () {
    $("#shoppingCartModal").modal("show");
  });
});
$(document).ready(function () {
  var itemCount = 0;
  var totalAmountRp = 0;

  $(".add-to-cart").click(function () {
    var name = $(this).data("name");
    var price = parseFloat($(this).data("price"));
    var itemHTML =
      '<li class="list-group-item">' +
      name +
      " - Rp" +
      price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") + // Format harga dalam Rupiah
      '<button type="button" class="btn btn-sm btn-danger remove-item float-right" data-price="' +
      price +
      '">Hapus</button></li>';
    $("#cart-items-list").append(itemHTML);
    itemCount++;
    totalAmountRp += price;
    $("#cart-count").text(itemCount);
    updateTotalAmount();
  });

  $(document).on("click", ".remove-item", function () {
    var price = parseFloat($(this).data("price"));
    $(this).closest("li").remove();
    itemCount--;
    totalAmountRp -= price;
    $("#cart-count").text(itemCount);
    updateTotalAmount();
  });

  $("#shopping-cart-btn").click(function () {
    $("#shoppingCartModal").modal("show");
  });

  $("#order-button").click(function () {
    if (itemCount === 0) {
      // Menampilkan modal keranjang kosong
      $("#emptyCartModal").modal("show");
      $("#orderConfirmationModal").modal("hide");
    } else {
      // Menampilkan modal konfirmasi pemesanan
      $("#orderConfirmationModal").modal("show");
      // Bersihkan keranjang pesanan
      $("#cart-items-list").empty();
      itemCount = 0;
      totalAmountRp = 0; // Set ulang totalAmountRp menjadi 0 di sini
      $("#cart-count").text(itemCount);
      updateTotalAmount();
    }
  });

  function updateTotalAmount() {
    $("#total-amount").text(
      "Rp" +
        totalAmountRp.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    ); // Format total harga dalam Rupiah
  }

  function recountTotalAmount() {
    totalAmountRp = 0;
    $("#cart-items-list .list-group-item").each(function () {
      var price = parseFloat(
        $(this)
          .text()
          .match(/- Rp([\d,]+)/)[1]
          .replace(",", "")
      ); // Mengambil harga dari teks di dalam li
      totalAmountRp += price;
    });
    updateTotalAmount();
  }

  $(window).scroll(function () {
    $("nav").toggleClass("bg-white", $(this).scrollTop() > 100);
  });
});
