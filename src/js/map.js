// init maps
{
  const iconSize = [54, 64];
  const iconOffset = [0, -65];

  const initMaps = () => {
    const maps = document.querySelectorAll('.js-map');

    Array.from(maps).forEach((map) => {
      const myMap = new ymaps.Map(
        map,
        {
          center: [55.803061, 38.047673],
          zoom: 11,
          controls: [],
        },
        {
          suppressMapOpenBlock: true,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      );

      myMap.geoObjects.add(
        new ymaps.Placemark(
          // [55.494288, 37.420644],
          [55.803061, 38.047673],
          {
            hintContent: '',
            balloonContent: '',
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'https://optim.tildacdn.com/tild3832-6633-4037-b931-386435396566/-/format/webp/balashiha.png.webp',
            //   iconImageHref: 'https://optim.tildacdn.com/tild3038-6536-4530-a130-313166313339/-/format/webp/senkino.png.webp',
            iconImageSize: iconSize,
            iconImageOffset: iconOffset,
          }
        )
      );

      myMap.controls.add('zoomControl', {
        position: {
          right: 15,
          top: 5,
        },
      });

      myMap.behaviors.disable('scrollZoom');
    });
  };

  if (document.querySelector('.js-map')) {
    ymaps.ready(initMaps);
  }
}
