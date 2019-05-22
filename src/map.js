/* eslint-disable */
export const yMap = () => {
  //Map

  if ($('#map').length) {
    var mapTmp = [[55.75, 37.57], [55.74, 37.56]];

    ymaps.ready(init);

    function init() {
      var myGeoObjects = [];
      let myMap = new ymaps.Map(
        'map',
        {
          center: [55.75, 37.57],
          zoom: 12,
          controls: [],
        },
        {
          maxZoom: 18,
          minZoom: 4,
          suppressMapOpenBlock: true,
        },
      );
      //myMap.behaviors.disable(['scrollZoom']);

      var clusterIcons = [
        {
          href: 'img/cluster-map.png',
          size: [58, 58],
          // Отступ, чтобы центр картинки совпадал с центром кластера.
          offset: [-29, -29],
          shape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 29,
          },
        },
      ];

      let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="map-claster">{{ properties.geoObjects.length }}</div>',
      );

      let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        clusterIcons: clusterIcons,
        clusterIconContentLayout: MyIconContentLayout,
      });
      // Создание макета балуна на основе Twitter Bootstrap.
      let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="popover">' +
            '<span class="close"></span>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=480 maxWidth=480 maxHeight=350]]' +
            '</div>' +
            '</div>',
          {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function() {
              this.constructor.superclass.build.call(this);

              this._$element = $('.popover', this.getParentElement());

              this.applyElementOffset();

              this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function() {
              this._$element.find('.close').off('click');

              this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function() {
              MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

              if (!this._isElement(this._$element)) {
                return;
              }

              this.applyElementOffset();

              this.events.fire('shapechange');
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function() {
              this._$element.css({
                left: -20,
                top: -(
                  this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                ),
              });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function(e) {
              e.preventDefault();

              this.events.fire('userclose');
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function() {
              if (!this._isElement(this._$element)) {
                return MyBalloonLayout.superclass.getShape.call(this);
              }

              var position = this._$element.position();

              return new ymaps.shape.Rectangle(
                new ymaps.geometry.pixel.Rectangle([
                  [position.left, position.top],
                  [
                    position.left + this._$element[0].offsetWidth,
                    position.top +
                      this._$element[0].offsetHeight +
                      this._$element.find('.arrow')[0].offsetHeight,
                  ],
                ]),
              );
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function(element) {
              return element && element[0] && element.find('.arrow')[0];
            },
          },
        ),
        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '$[properties.balloonContentBody]',
        );
      mapTmp.forEach(function(coord) {
        console.log(coord);
        let mark = new ymaps.Placemark(
          coord,
          {
            balloonContentBody:
              "<div class='map-balloon'>" +
              "<div class='map-balloon__title'>" +
              "<a href='#' class='i-link-black'>ул. Минусинская, 8, стр.Б, секция 18</a>" +
              '</div>' +
              "<div class='map-balloon__free'>" +
              'Свободных площадей: <b>34</b>' +
              '</div>' +
              "<div class='map-balloon__footer'>" +
              "<div class='map-balloon__footer-item'>" +
              "<div class='txt-val'><small>от</small> 2 <small>м²</small> <span class='fromto'>—</span> <small>до</small> 200 <small>м²</small></div>" +
              '</div>' +
              "<div class='map-balloon__footer-item'>" +
              "<div class='txt-val'><small>от</small> 2 400 <small>₽/мес</small></div>" +
              '</div>' +
              '</div>' +
              '</div>',
          },
          {
            balloonLayout: MyBalloonLayout,
            iconLayout: 'default#image',
            iconImageHref: 'img/pin-map-sprite.png',
            iconImageSize: [26, 35],
            iconImageOffset: [-13, -35],
            iconImageClipRect: [[0, 15], [26, 50]],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -5],
            balloonMaxWidth: 500,
            balloonMinWidth: 480,
          },
        );
        mark.events
          .add('balloonopen', function(e) {
            e.get('target').options.set({
              iconImageClipRect: [[0, 0], [15, 15]],
              iconImageOffset: [-8, -12],
              iconImageSize: [15, 15],
            });
          })
          .add('balloonclose', function(e) {
            e.get('target').options.set({
              iconImageClipRect: [[0, 15], [26, 50]],
              iconImageOffset: [-13, -35],
              iconImageSize: [26, 35],
            });
          });

        myGeoObjects.push(mark);
      });

      //Для открытия балуна
      //mark.balloon.open();
      clusterer.add(myGeoObjects);
      myMap.geoObjects.add(clusterer);

      myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true,
      });

      $('#mapZoomIn').on('click', function() {
        myMap.setZoom(myMap.getZoom() + 1, {
          duration: 200,
          checkZoomRange: true,
        });
      });
      $('#mapZoomOut').on('click', function() {
        myMap.setZoom(myMap.getZoom() - 1, {
          duration: 200,
          checkZoomRange: true,
        });
      });
      $('#mapGeo').on('click', function() {
        ymaps.geolocation
          .get({
            mapStateAutoApply: true,
          })
          .then(function(result) {
            myMap.geoObjects.add(result.geoObjects);
          });
      });
    }

    //Open filters Map
    $('.js-mapFilterBtn').on('click', function() {
      $(this)
        .closest('.js-mapBox')
        .toggleClass('is-open-filters');
    });
  }
};
