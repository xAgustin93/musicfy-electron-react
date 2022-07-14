import React, { useState, useEffect, useRef } from "react";
import { Image, Icon } from "semantic-ui-react";
import Slick from "react-slick";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { usePlayer } from "../../../hooks";
import "./Slider.scss";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  swipeToSlide: true,
  centerMode: true,
  adaptiveHeight: true,
};

export function Slider(props) {
  const { data, basePath, song } = props;
  const [size, setSize] = useState(0);
  const [loadCompleted, setLoadCompleted] = useState(false);
  const itemRef = useRef();
  const { playSong } = usePlayer();

  useEffect(() => {
    if (itemRef.current) {
      setSize(itemRef.current.clientWidth);
    }
  }, [loadCompleted]);

  return (
    <Slick {...settings} className="slider">
      {map(data, (item) => {
        if (song) {
          return (
            <div
              key={item.id}
              className="slider__item"
              ref={itemRef}
              onLoad={() => setLoadCompleted(true)}
              onClick={() => playSong(item, item.image)}
            >
              <div className="slider__item-block-play">
                <Image
                  src={item.image}
                  alt={item.bame}
                  style={{ height: size }}
                />
                <Icon name="play circle outline" />
              </div>
              <h3>{item.name}</h3>
            </div>
          );
        }

        return (
          <Link
            to={`/${basePath}/${item.id}`}
            key={item.id}
            className="slider__item"
            ref={itemRef}
            onLoad={() => setLoadCompleted(true)}
          >
            <Image src={item.image} alt={item.name} style={{ height: size }} />
            <h3>{item.name}</h3>
          </Link>
        );
      })}
    </Slick>
  );
}
