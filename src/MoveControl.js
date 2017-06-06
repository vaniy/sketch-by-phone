/* globals Hammer */

import React, { Component } from 'react';

import degToRad from './utils/degToRad';

class SketchControl extends Component {
    state = {
        pan: {
            startX: 1,
            startZ: 2,
        },
        rotation: {
            start: 0,
        },
        scale: {
            startX: 2,
            startY: 2,
        }
    }

    componentWillMount() {
        const { canvas } = this.props;

        const hammer = new Hammer(canvas);

        hammer.get('pinch').set({ enable: true });
        hammer.get('rotate').set({ enable: true });
        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('panstart', this.handlePan);

        hammer.on('panmove', this.handlePan);

        hammer.on('pinchstart', this.handlePinch);

        hammer.on('pinch', this.handlePinch);

        hammer.on('rotatestart', this.handleRotate);

        hammer.on('rotatemove', this.handleRotate);
    }

    handlePan = (ev) => {
        const { coordX, coordZ, onTranslateChange } = this.props;
        if (ev.type === 'panstart') {
            this.setState({
                ...this.state,
                pan: {
                    startX: coordX,
                    startZ: coordZ,
                },
            });
        }
        onTranslateChange({
                x: this.state.pan.startX + ev.deltaX / 200,
                z: this.state.pan.startZ + ev.deltaY / 200,
        });
    }

    handlePinch = (ev) => {
        const { scaleX, scaleY, onZoomChange } = this.props;
        if (ev.type === 'pinchstart') {
            this.setState({
                ...this.state,
                scale: {
                    ...this.state.scale,
                    startX: scaleX,
                    startY: scaleY,
                },
            });
        }
        onZoomChange({
            x: this.state.scale.startX * ev.scale,
            y: this.state.scale.startY * ev.scale,
        });
    }

    handleRotate = (ev) => {
        const { rotation, onRotationChange } = this.props;
        if (ev.type === 'rotatestart') {
            this.setState({
                ...this.state,
                rotation: {
                    start: rotation + degToRad(ev.rotation), // the first rotation is the angle between the two finger ignoring it.
                },
            });
            return;
        }
        onRotationChange(this.state.rotation.start - degToRad(ev.rotation));
    }
    render() {
        return null;
    }
}

export default SketchControl;
