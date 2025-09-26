import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

type IconMapping = Record<string, SymbolViewProps['name']>;

/**
 * Add your SF Symbols mappings here.
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'house.fill',
  'paperplane.fill': 'paperplane.fill',
  'chevron.left.forwardslash.chevron.right': 'chevron.left.forwardslash.chevron.right',
  'chevron.right': 'chevron.right',
  'music.note': 'music.note',
} as IconMapping;

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={MAPPING[name]}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
