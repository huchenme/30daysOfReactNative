import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Slider,
  Text,
  ScrollView,
} from 'react-native'
import GL from 'gl-react'
import {Surface} from 'gl-react-native'
import {screenWidth} from './dimensions'
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
        // Algorithm from Chapter 16 of OpenGL Shading Language
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
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

export default class Day11 extends Component {
  state = {
    gradientValue: 0,
    saturationFactor: 1,
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
            resizeMode="cover"
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
