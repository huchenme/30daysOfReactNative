import React, {Component, PropTypes} from 'react'
import {
  ScrollView,
  Slider,
  StyleSheet,
  Text,
} from 'react-native'
import {Surface} from 'gl-react-native'
import {screenWidth} from './dimensions'
import GL from 'gl-react'
import resolveAssetSource from 'resolveAssetSource'

const Header = ({children}) => (
  <Text style={styles.header}>{children}</Text>
)
Header.propTypes = {
  children: PropTypes.any.isRequired,
}

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform float value;
      void main () {
        gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
      }
    `,
  },
  saturation: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D image;
      uniform float factor;
      void main () {
        vec4 c = texture2D(image, uv);
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
      }
    `,
  },
  pieProgress: {
    frag: `
      precision mediump float;
      varying vec2 uv;
      uniform vec4 colorInside, colorOutside;
      uniform float radius;
      uniform float progress;
      uniform vec2 dim;
      const vec2 center = vec2(0.5);
      const float PI = acos(-1.0);
      void main () {
        vec2 norm = dim / min(dim.x, dim.y);
        vec2 p = uv * norm - (norm-1.0)/2.0;
        vec2 delta = p - center;
        float inside =
          step(length(delta), radius) *
          step((PI + atan(delta.y, - 1.0 * delta.x)) / (2.0 * PI), progress);
        gl_FragColor = mix(
          colorOutside,
          colorInside,
          inside
        );
      }
    `,
  },
})

const HelloGL = GL.createComponent(
  ({value}) =>
    <GL.Node shader={shaders.helloGL} uniforms={{value}} />,
  {displayName: 'HelloGL'}
)

const Saturation = GL.createComponent(
  ({factor, image, ...rest}) =>
    <GL.Node shader={shaders.saturation} uniforms={{factor, image}} />,
  {displayName: 'Saturation'}
)

const PieProgress = GL.createComponent(
  ({
    width,
    height,
    progress,
    colorInside,
    colorOutside,
    radius,
  }) =>
    <GL.Node
      shader={shaders.pieProgress}
      uniforms={{
        dim: [width, height],
        progress,
        colorInside,
        colorOutside,
        radius,
      }}
    />,
  {
    displayName: 'PieProgress',
    defaultProps: {
      colorInside: [0, 0, 0, 0.4],
      colorOutside: [0, 0, 0, 0],
      radius: 0.4,
    },
  }
)

export default class Day11 extends Component {
  state = {
    gradientValue: 0,
    saturationFactor: 1,
    progress: 0,
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header>Gradient</Header>
        <Surface width={screenWidth} height={200}>
          <HelloGL
            value={this.state.gradientValue}
          />
        </Surface>
        <Slider
          value={0}
          onValueChange={(value) => this.setState({gradientValue: value})} />
        <Header>Saturation</Header>
        <Surface width={screenWidth} height={200}>
          <Saturation
            factor={this.state.saturationFactor}
            resizeMode='cover'
            image={resolveAssetSource(require('./assets/gl.png'))}
          />
        </Surface>
        <Slider
          maximumValue={2}
          value={1}
          onValueChange={saturationFactor => {
            this.setState({saturationFactor})
          }}
        />
        <Header>PieProgress</Header>
        <Surface
          width={screenWidth}
          height={200}
          backgroundColor='transparent'>
          <PieProgress progress={this.state.progress} />
        </Surface>
        <Slider
          value={0}
          onValueChange={progress => this.setState({progress})}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 10,
  },
})
