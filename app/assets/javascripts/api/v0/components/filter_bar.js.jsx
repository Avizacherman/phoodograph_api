var FilterBar = React.createClass({
	render: function(){
		return (
				<div className="ui left vertical sidebar inverted labled icon menu" id="filter-bar">
					<h1 className="ui center aligned header"> Filters </h1>
					<FilterForm filters={this.props.filters} categoryList={this.props.categoryList} onSubmit={this.props.updateFilters}/>
  			</div>

			)
	}
})

var FilterForm = React.createClass({
	
	render: function(){

		return (

						<form className="ui form" id="filter-form" onSubmit={this.props.onSubmit}>
						<div className="field">
							<label id="inputLabel"> </label>
							<CategorySelection categoryList={this.props.categoryList} filters={this.props.filters}/>
							<RadiusInput filters={this.props.filters}/>
							<button>Submit</button>
		  		 </div>
	  			</form>
	  )
	}
})

var CategorySelection = React.createClass({
	componentDidMount: function () {
		console.log
		React.findDOMNode(this.refs.selectBox).setAttribute('multiple', '')
		$(React.findDOMNode(this.refs.selectBox)).dropdown()
	},
	render: function(){

		var categoryOptions = this.props.categoryList.map(function(category){
			return (
				<option value={category}> {category} </option>
				)
		})

		return (
						<select className="ui fluid search dropdown" ref="selectBox" id="category-select">
						<option value=""> Categories </option>
						{categoryOptions}
				   </select>
			)
	}
})

var RadiusInput = React.createClass({
	componentDidMount: function () {
	   radiusObject = $.grep(this.props.filters, function(obj){
	   	return Object.keys(obj) == 'radius'
	   })[0]
	   radius = radiusObject.radius
	   $(React.findDOMNode(this.refs.radius)).val(radius)
	},
	render: function(){
		return(
			<input id="radius" ref="radius"/>
			)
	}
})