import {interpolate, staticFile} from 'remotion';
import {Audio, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {RequestMetadata} from '../lib/interfaces';
import {FALLBACK_AUDIO_URL} from '../server/TextToSpeech/constants';

export const Text: React.FC<RequestMetadata> = (props) => {
	const {titleText, titleColor, subtitleText} = props;
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const titleTextForAnimation = titleText.split(' ').map((t) => ` ${t} `);

	return (
		<>
			{props.audioUrl && (
				<Audio
					id="TTS Audio"
					about="TTS Audio"
					src={
						props.audioUrl === FALLBACK_AUDIO_URL
							? staticFile(FALLBACK_AUDIO_URL)
							: props.audioUrl
					}
				/>
			)}

			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 110,
					textAlign: 'center',
					position: 'absolute',
					top: 160,
					width: '100%',
				}}
			>
				{titleTextForAnimation.map((t, i) => {
					return (
						<span
							key={t}
							style={{
								color: titleColor,
								marginLeft: 10,
								marginRight: 10,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * 5,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>

			<h2
				style={{
					opacity: interpolate(frame, [95, 100], [0.1, 1]),
					transform: `scale(${interpolate(frame, [95, 100], [0.9, 1], {
						extrapolateRight: 'clamp',
					})})`,
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 70,
					textAlign: 'center',
					position: 'absolute',
					bottom: 160,
					width: '100%',
					color: titleColor,
				}}
			>
				{subtitleText}
			</h2>
		</>
	);
};
