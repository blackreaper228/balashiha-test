import './style.css';
import './kuvekinoStyle.css';

import './js/adminka_lotov.js';
import './js/adminka.js';
import './js/history.js';
import './js/gallery.js';
import './js/map.js';

// основные js-скрипты

document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.O_BurgerMenu');
  const burgerMenuList = document.querySelector('.W_BurgerMenuList');
  const burgerOpenBtn = document.querySelector('.A_BurgerMenuButton');
  const burgerCloseBtn = document.querySelector('.A_BurgerCloseButton');

  // На некоторых версиях страницы бургер реализован другой разметкой/скриптом.
  // Поэтому обязательно проверяем наличие элементов.
  if (burgerMenu && burgerMenuList && burgerOpenBtn) {
    burgerOpenBtn.addEventListener('click', function () {
      burgerMenu.classList.add('U_Open');
      burgerMenuList.classList.add('U_BurgerMenuListOpen');
    });
  }
  if (burgerMenu && burgerMenuList && burgerCloseBtn) {
    burgerCloseBtn.addEventListener('click', function () {
      burgerMenu.classList.remove('U_Open');
      burgerMenuList.classList.remove('U_BurgerMenuListOpen');
    });
  }
  let allBurgerMenuLinks = document.querySelectorAll('.U_LinkToOffer');
  allBurgerMenuLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Close the menu
      burgerMenu.classList.remove('U_Open');
      burgerMenuList.classList.remove('U_BurgerMenuListOpen');

      // Get the target section ID from the href
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      // Check if the target element exists
      if (targetElement) {
        // Calculate the position of the target element with an offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 70;

        // Smoothly scroll to the calculated position
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
  const listOfCards = document.querySelector('#U_Cards');
  let currentPosition = 0;
  let swipeNumber = 0;
  if (!listOfCards) return;

  listOfCards.style.left = currentPosition;

  const cardsLeftBtn = document.querySelector('.U_Left');
  const cardsRightBtn = document.querySelector('.U_RightNew');

  cardsLeftBtn?.addEventListener('click', function () {
    console.log('test');
    if (currentPosition < 0) {
      currentPosition += listOfCards.childNodes[1].offsetWidth + 2;
      listOfCards.style.left = `${currentPosition}px`;
      console.log('left', listOfCards.childNodes[1].offsetWidth, currentPosition);
    } else {
      console.log('Нельзя');
    }
  });

  cardsRightBtn?.addEventListener('click', function () {
    const divs = Array.from(listOfCards.children).filter((el) => el.tagName === 'DIV');
    console.log(divs);
    const elementToClone = divs[swipeNumber];
    if (!elementToClone) return;
    const clone = elementToClone.cloneNode(true);
    listOfCards.appendChild(clone);
    swipeNumber += 1;
    currentPosition -= listOfCards.childNodes[1].offsetWidth + 2;
    listOfCards.style.left = `${currentPosition}px`;
    const DesktopCards = document.querySelectorAll('.U_DesktopCard');
    DesktopCards.forEach((card) => {
      card.addEventListener('mouseenter', (e) => {
        e.target.children[0].classList.add('U_HoverAnimationOpen');
        e.target.children[0].children[1];
        e.target.children[0].children[1].classList.add('U_TextInCardOpacity');
        e.target.children[0].children[0].children[1].classList.add('A_PlusButtonHover');
      });
      card.addEventListener('mouseleave', (e) => {
        e.target.children[0].classList.remove('U_HoverAnimationOpen');
        e.target.children[0].children[1];
        e.target.children[0].children[1].classList.remove('U_TextInCardOpacity');
        e.target.children[0].children[0].children[1].classList.remove('A_PlusButtonHover');
      });
    });
  });
  // document.querySelector('.U_Right').addEventListener('click', function () {
  //     console.log(currentPosition, -listOfCards.offsetWidth)
  //     // if (currentPosition > (-listOfCards.offsetWidth + (listOfCards.childNodes[1].offsetWidth * 3) + (2 * 3))){
  //     if (currentPosition > -(listOfCards.offsetWidth + listOfCards.childNodes[1].offsetWidth)) {
  //         currentPosition -= listOfCards.childNodes[1].offsetWidth + 2
  //         listOfCards.style.left = `${currentPosition}px`
  //         console.log('left', listOfCards.childNodes[1].offsetWidth, currentPosition)
  //     } else {
  //         console.log('Нельзя')
  //     }
  // });
  const DesktopCards = document.querySelectorAll('.U_DesktopCard');
  DesktopCards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      e.target.children[0].classList.add('U_HoverAnimationOpen');
      e.target.children[0].children[1];
      e.target.children[0].children[1].classList.add('U_TextInCardOpacity');
      e.target.children[0].children[0].children[1].classList.add('A_PlusButtonHover');
    });
    card.addEventListener('mouseleave', (e) => {
      e.target.children[0].classList.remove('U_HoverAnimationOpen');
      e.target.children[0].children[1];
      e.target.children[0].children[1].classList.remove('U_TextInCardOpacity');
      e.target.children[0].children[0].children[1].classList.remove('A_PlusButtonHover');
    });
  });
  const rows = document.querySelectorAll('.W_MainTable .A_TableRow');
  const showMoreButton = document.querySelector('.W_TableButton .A_Button');
  let visibleRows = 10; // Number of rows to show initially
  // Function to update row visibility
  function updateVisibility() {
    rows.forEach((row, index) => {
      if (index < visibleRows) {
        row.style.display = 'flex'; // Show the row
      } else {
        row.style.display = 'none'; // Hide the row
      }
    });

    // Hide the button if all rows are visible
    // if (visibleRows >= rows.length) {
    //     showMoreButton.style.display = 'none';
    // }
  }

  // Initial call to set the initial visibility
  updateVisibility();
  // Mobile Cards swipe and arrows
  const cardContainer = document.getElementById('U_CardsMobile');
  const activeCounterElement = document.querySelector('.U_Active');
  const cardWidth = cardContainer.children[0].offsetWidth;
  let activeIndex = 0;
  let startX = 0;

  // Function to update card position and counter display
  function updateCardDisplay() {
    const translateValue = -activeIndex * (cardWidth + 2); // Adjust for gap
    cardContainer.style.left = `${translateValue}px`;
    activeCounterElement.textContent = activeIndex + 1; // Displaying count starting from 1
  }

  // Left arrow click
  document.querySelector('.U_LeftMobile').addEventListener('click', () => {
    console.log('tets');
    if (activeIndex > 0) {
      activeIndex--;
      updateCardDisplay();
    }
  });

  // Right arrow click
  document.querySelector('.U_RightMobile').addEventListener('click', () => {
    console.log('tets');
    if (activeIndex < cardContainer.children.length - 1) {
      activeIndex++;
      updateCardDisplay();
    }
  });

  // Swipe start
  cardContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  // Swipe end
  cardContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = endX - startX;
    const threshold = 50; // Swipe threshold

    if (difference > threshold && activeIndex > 0) {
      // Swipe right
      activeIndex--;
    } else if (difference < -threshold && activeIndex < cardContainer.children.length - 1) {
      // Swipe left
      activeIndex++;
    }
    updateCardDisplay();
  });

  // Initial display update
  updateCardDisplay();

  // Event listener for "Show more" button
  showMoreButton?.addEventListener('click', () => {
    visibleRows += 10; // Increase the number of visible rows by 10
    updateVisibility(); // Update visibility after increment
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const offersContainer = document.querySelector('.W_Offers');
  const offers = document.querySelectorAll('.W_Offer');

  if (offers.length > 0) {
    const totalOffers = offers.length;
    let currentIndex = 0;

    const leftArrow = document.querySelector('.U_LeftOffer');
    const rightArrow = document.querySelector('.U_RightOffer');

    // Update the mobile counter
    const currentCountElement = document.querySelector('.A_Mobilecount.U_Dynamic');
    const totalCountElement = document.querySelector('.A_Mobilecount:last-child');

    // Function to get the width of a slide including gap
    const getSlideWidth = () => {
      const slide = offers[0];
      const slideWidth = slide.getBoundingClientRect().width;
      const containerStyles = window.getComputedStyle(offersContainer);
      const gapWidth = parseFloat(containerStyles.columnGap || containerStyles.gap || 0);
      return slideWidth + gapWidth;
    };

    const updateSliderPosition = () => {
      const slideWidth = getSlideWidth();
      const translateX = -(currentIndex * slideWidth);
      offersContainer.style.transform = `translateX(${translateX}px)`;
      currentCountElement.textContent = currentIndex + 1;
    };

    rightArrow.addEventListener('click', () => {
      if (currentIndex < totalOffers - 1) {
        currentIndex++;
        updateSliderPosition();
      }
    });

    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    });

    // Optional: Update slide width on window resize
    window.addEventListener('resize', updateSliderPosition);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const offersContainer = document.querySelector('.W_Offers');
  const offers = document.querySelectorAll('.W_Offer');
  const totalOffers = offers.length;
  let currentIndex = 0;

  const leftArrow = document.querySelector('.U_LeftOffer');
  const rightArrow = document.querySelector('.U_RightOffer');

  // Update the mobile counter
  const currentCountElement = document.querySelector('.A_Mobilecount.U_Dynamic');
  const totalCountElement = document.querySelector('.A_Mobilecount:last-child');
  totalCountElement.textContent = totalOffers;

  // Function to get the width of a slide including gap
  const getSlideWidth = () => {
    const slide = offers[0];
    const slideWidth = slide.getBoundingClientRect().width;
    const containerStyles = window.getComputedStyle(offersContainer);
    const gapWidth = parseFloat(containerStyles.columnGap || containerStyles.gap || 0);
    return slideWidth + gapWidth;
  };

  const updateSliderPosition = () => {
    const slideWidth = getSlideWidth();
    const translateX = -(currentIndex * slideWidth);
    offersContainer.style.transform = `translateX(${translateX}px)`;
    currentCountElement.textContent = currentIndex + 1;
  };

  rightArrow.addEventListener('click', () => {
    if (currentIndex < totalOffers - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  // Optional: Update slide width on window resize
  window.addEventListener('resize', updateSliderPosition);
});

// вывод текущего года в футере

const year = new Date().getFullYear();
document.getElementById('footerCopyrightYear').textContent = `© ${year} Parametr`;
