var colorMap = {
	description: "e",
	personality: "f",
	ideals: "g",
	bonds: "h",
	flaws: "i",
	backstory: "j",
	languages: "k"
}

Template.persona.helpers({
	characterDetails: function(){
		var char = Characters.findOne(this._id, {fields: {name: 1, gender: 1, alignment: 1, race:1}})
		char.field = "details";
		char.title = char.name;
		char.color = "d";
		return char;
	},
	characterField: function(field, title){
		var fieldSelector = {fields: {}};
		fieldSelector.fields[field] = 1;
		var char = Characters.findOne(this._id, fieldSelector);
		var color = colorMap[field];
		return {_id: char._id, title: title, field: field, color: color, body: char[field]};
	}
});

Template.persona.events({
	"tap .containerTop": function(event){
		if(this.field !== "details"){
			var charId = Template.parentData()._id;
			GlobalUI.setDetail({
				template: "textDialog",
				data:     {charId: charId, field: this.field, title: this.title, color: this.color},
				heroId:   this._id + this.field
			});
		} else{
			this.charId = Template.parentData()._id;
			GlobalUI.setDetail({
				template: "personaDetailsDialog",
				data:     this,
				heroId:   this._id + "details"
			});
		}		
	}
});