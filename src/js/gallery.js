// скрипт галереи

document.addEventListener('DOMContentLoaded', () => {
  // === СЛАЙДЕР ГАЛЕРЕИ (главный) ===
  // Управление горизонтальной прокруткой карточек галереи
  let currentIndexHistoryG = 0;
  const historyContainerG = document.querySelector('.W_RowHistoryG');
  const historyG = document.querySelectorAll('.M_HistoryItemG');
  const totalHistoryG = historyG.length;

  const leftArrowHistoryG = document.querySelector('.U_LeftHistoryG');
  const rightArrowHistoryG = document.querySelector('.U_RightHistoryG');

  // Если на странице нет галереи/стрелок — просто выходим, чтобы не падать.
  if (!historyContainerG || !historyG.length || !leftArrowHistoryG || !rightArrowHistoryG) {
    return;
  }

  const getSlideWidthHistoryG = () => {
    const slide = historyG[0];
    const slideWidth = slide.getBoundingClientRect().width;
    return slideWidth;
  };

  const updateSliderPositionHistoryG = () => {
    const slideWidth = getSlideWidthHistoryG();
    const translateX = -(currentIndexHistoryG * slideWidth);
    historyContainerG.style.transform = `translateX(${translateX}px)`;
  };

  // Кнопки навигации для слайдера галереи
  rightArrowHistoryG.addEventListener('click', () => {
    if (currentIndexHistoryG < totalHistoryG - 1) {
      currentIndexHistoryG++;
      updateSliderPositionHistoryG();
    }
  });

  leftArrowHistoryG.addEventListener('click', () => {
    if (currentIndexHistoryG > 0) {
      currentIndexHistoryG--;
      updateSliderPositionHistoryG();
    }
  });

  // === МОДАЛЬНОЕ ОКНО С ДЕТАЛЯМИ ГАЛЕРЕИ ===
  // Открытие/закрытие детальной информации при клике на карточку
  let currentActiveImageIndexG = 0;

  const historyItemsG = document.querySelectorAll('.M_HistoryItemG');
  const closingItemsG = document.querySelectorAll('.A_CloseButtonG');
  const historyWrapperG = document.querySelector(`.O_HistoryInsideG`);

  if (!historyWrapperG || !historyItemsG.length) {
    return;
  }

  function historyModalScrollUnlockG() {
    window.__kuvekinoHistoryModalScroll?.unlock();
  }
  function historyModalScrollLockG() {
    window.__kuvekinoHistoryModalScroll?.lock();
  }

  // Закрытие при клике на фон
  historyWrapperG.addEventListener('click', function (event) {
    if (event.target == historyWrapperG) {
      currentActiveImageIndexG = 0;
      document.querySelectorAll('.M_HistoryInsideItemG').forEach((item) => {
        historyWrapperG.classList.remove('active');
        item.classList.remove('active');
      });
      historyModalScrollUnlockG();
    }
  });

  // Закрытие по кнопке
  closingItemsG.forEach((Button) => {
    Button.addEventListener('click', function () {
      document.querySelectorAll('.M_HistoryInsideItemG').forEach((item) => {
        historyWrapperG.classList.remove('active');
        item.classList.remove('active');
      });
      historyModalScrollUnlockG();
    });
  });

  // Открытие модального окна при клике на карточку
  historyItemsG.forEach((item) => {
    item.addEventListener('click', function () {
      const itemId = this.id;
      const insideItems = document.querySelectorAll('.M_HistoryInsideItemG');
      insideItems.forEach((insideItem) => {
        insideItem.classList.remove('active');
      });

      const targetInsideItem = document.querySelector(`.M_HistoryInsideItemG[id="${itemId}"]`);
      const targetInsideItemWrapper = document.querySelector(`.O_HistoryInsideG`);
      if (targetInsideItem && targetInsideItemWrapper) {
        targetInsideItem.classList.add('active');
        targetInsideItemWrapper.classList.add('active');
        historyModalScrollLockG();
      }
    });
  });

  // === СЛАЙДЕР ИЗОБРАЖЕНИЙ ВНУТРИ МОДАЛЬНОГО ОКНА ===
  // Управление галереей фотографий в детальном просмотре
  const getSlideWidthNewG = (AllImagesInSlider) => {
    const slide = AllImagesInSlider;
    const slideWidth = slide.getBoundingClientRect().width;
    return slideWidth;
  };

  const leftArrowsG = document.querySelectorAll('.U_LeftHistoryInsideItemG');
  const rightArrowsG = document.querySelectorAll('.U_RightHistoryInsideItemG');

  function slideLeftG(sliderContainer) {
    let slideWidth = getSlideWidthNewG(sliderContainer.children[0]);
    if (currentActiveImageIndexG > 0) {
      currentActiveImageIndexG--;
      const translateX = -(currentActiveImageIndexG * slideWidth);
      sliderContainer.style.transform = `translateX(${translateX}px)`;
    }
  }

  function slideRightG(sliderContainer) {
    let slideWidth = getSlideWidthNewG(sliderContainer.children[0]);
    if (sliderContainer.children.length - 1 > currentActiveImageIndexG) {
      currentActiveImageIndexG++;
      const translateX = -(currentActiveImageIndexG * slideWidth);
      sliderContainer.style.transform = `translateX(${translateX}px)`;
    }
  }

  // Привязка кнопок к слайдерам изображений
  leftArrowsG.forEach((leftArrow) => {
    leftArrow.addEventListener('click', function () {
      const slideId = this.id;
      const sliderContainer = document.querySelector(`.M_HistoryInsideItemSliderImagesG[id="${slideId}"]`);
      if (sliderContainer) slideLeftG(sliderContainer);
    });
  });

  rightArrowsG.forEach((rightArrow) => {
    rightArrow.addEventListener('click', function () {
      const slideId = this.id;
      const sliderContainer = document.querySelector(`.M_HistoryInsideItemSliderImagesG[id="${slideId}"]`);
      if (sliderContainer) slideRightG(sliderContainer);
    });
  });
});

const updateSliderPositionHistoryBuildingG = () => {
  const slideWidth = getSlideWidthHistoryG();
  console.log(currentIndexHistoryG, slideWidth);
  const translateX = -(currentIndexHistoryG * slideWidth);
  console.log(`translateX(${translateX}px)`);
  historyContainerG.style.transform = `translateX(${translateX}px)`;
};

// === АНИМАЦИЯ ИКОНКИ ПЛЮС ПРИ НАВЕДЕНИИ ===
// Показ/скрытие иконки при наведении на карточку
let allHistoryCardsG = document.querySelectorAll('.M_HistoryItemG');
allHistoryCardsG.forEach((card) => {
  const plusIcon = card.querySelector('.A_HistoryItemPlusIconG');
  if (plusIcon) {
    card.addEventListener('mouseenter', () => {
      plusIcon.classList.add('A_Active');
    });

    card.addEventListener('mouseleave', () => {
      plusIcon.classList.remove('A_Active');
    });
  } else {
    console.warn('Plus icon was not found in card:', card);
  }
});
