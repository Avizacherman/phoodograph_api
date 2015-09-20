var FilterBar = React.createClass({
	closeFilters: function(){
		$('#filter-bar').sidebar('toggle')
	},
	render: function(){
		return (
				<div className="ui left vertical sidebar labled icon menu" id="filter-bar">
				<span id="close-filter" onClick={this.closeFilters}> X </span>
					<h1 className="ui center aligned header"> Filters </h1>
					<div className="ui center aligned container">
						<FilterForm filters={this.props.filters} categoryList={this.props.categoryList} onSubmit={this.props.updateFilters}/>
					</div>
  			</div>

			)
	}
})

var FilterForm = React.createClass({
	resetFilters: function(){
		$('#rating-filter').rating('set rating', 1)
		$('#category-select').dropdown('restore defaults')
		$('#radius-input').val(20)
		this.props.onSubmit()
	},
	render: function(){

		return (

						<form className="ui form" id="filter-form" onSubmit={this.props.onSubmit}>
						
							<CategorySelection categoryList={this.props.categoryList} filters={this.props.filters}/>
							<RadiusInput filters={this.props.filters}/>
							<RatingInput filters={this.props.filters}/>
							<div className="ui two buttons">
								<button className="ui blue labeled icon button">
									<i className="filter icon"> </i> 
									Apply Filters		
								</button>
								<button onClick={this.resetFilters}className="ui red labeled icon button"> 
									<i className="refresh icon"></i>
										Reset Filters
								</button>
		  			 </div>
	  			</form>
	  )
	}
})

var CategorySelection = React.createClass({
	componentDidMount: function () {
		React.findDOMNode(this.refs.selectBox).setAttribute('multiple', '')
		$(React.findDOMNode(this.refs.selectBox)).dropdown()
	},
	render: function(){

		var categoryOptions = this.props.categoryList.map(function(category, index){
			var optionIndex = "cat" + index
			return (
				<option key={optionIndex} value={category.toLowerCase()}> {category} </option>
				)
		})

		return (<div className="field">
							<label id="categoryLabel"> </label>
						<select className="ui fluid search dropdown" ref="selectBox" id="category-select">
						<option value="placeholder"> Categories </option>
						{categoryOptions}
				   </select>
				   </div>
			)
	}
})

var RadiusInput = React.createClass({
	componentDidMount: function () {
	   radiusObject = $.grep(this.props.filters, function(obj){
	   	return Object.keys(obj) == 'radius'
	   })[0]
	   radius = radiusObject.radius
	   $(React.findDOMNode(this.refs.radiusInput)).val(radius)
	},
	render: function(){
		return(
			<div className="field">
				<label id="radius-label"> Search Radius </label>
				<div className="ui right labeled input">
					<input id="radius-input" ref="radiusInput" />

					<div className="ui basic label">
						Miles
					</div>
				</div>

			</div>
			)
	}
})

var RatingInput = React.createClass({
	componentDidMount: function () {
	    $(React.findDOMNode(this.refs.ratingFilter)).rating()
	},
	render: function(){
		return(
			<div className="field">
							<label id="rating-label">Average Review Score</label>
			<div className="ui star rating" data-rating="1" ref="ratingFilter" id="rating-filter" data-max-rating="5"/>
			</div>
			)
	}
})