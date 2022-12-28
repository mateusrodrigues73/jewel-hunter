const hud = (context, text, color = '#00f', y = 0) => {
	let textSize = 14;
	context.font = `bold ${textSize}px arial`;
	context.textBaseline = 'top';
	let textMetric = context.measureText(text);
	context.fillStyle = color;
	context.fillText(text, context.canvas.width / 2 - textMetric.width / 2, y);
}

export default hud;
