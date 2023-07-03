const settings = [
	{
		active: false,
		name: 'Status'
	},
	{
		active: false,
		name: 'Integrations'
	},
	{
		active: false,
		name: 'Points'
	}
];

export const ListSetting = () => {
	return (
			<div className="list-setting">
				{settings.map(item => (
					<div className="item-setting">
      <span className="item-text">{item.name}</span>
     </div>
				))}
			</div>
	)
}