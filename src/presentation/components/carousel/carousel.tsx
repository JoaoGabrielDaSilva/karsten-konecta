import React, { useEffect, useState } from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Container, Image, Arrow, LeftSide, RightSide, Page } from "./styles";

type Props = {
  images: string[];
  style?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

export const Carousel = ({ images, style }: Props) => {
  const ref = useAnimatedRef<Animated.ScrollView>();

  const translateX = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    translateX.value = 0;
  }, [images]);

  const previousButtonIsDisabled = index === 0;
  const nextButtonIsDisabled = index === images?.length - 1;

  const handleNext = () => {
    if (nextButtonIsDisabled) return;

    const nextIndex = index + 1;

    ref.current.scrollTo({ x: nextIndex * width });
  };
  const handlePrevious = () => {
    if (previousButtonIsDisabled) return;

    const previousIndex = index - 1;
    ref.current.scrollTo({ x: previousIndex * width });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;

      const index = e.contentOffset.x / width;

      if (Number.isInteger(index)) {
        runOnJS(setIndex)(index);
      }
    },
  });

  return (
    <Container style={style}>
      <Animated.ScrollView
        ref={ref}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      >
        {images?.map((item, index) => (
          <Image key={index} source={{ uri: item }} resizeMode="contain" />
        ))}
      </Animated.ScrollView>
      <Page textAlign="center">
        {index + 1}/{images?.length}
      </Page>
      <LeftSide>
        <Arrow
          name="chevron-left"
          onPress={handlePrevious}
          disabled={previousButtonIsDisabled}
        />
      </LeftSide>
      <RightSide>
        <Arrow
          name="chevron-right"
          onPress={handleNext}
          disabled={nextButtonIsDisabled}
        />
      </RightSide>
    </Container>
  );
};
