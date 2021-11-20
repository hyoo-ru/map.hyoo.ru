namespace $.$$ {
	export class $hyoo_map_pane extends $.$hyoo_map_pane {
		
		geo_to_tile_x( val: number ) {
			return val / 180 * 128
		}
		
		geo_to_tile_y( val: number ) {
			let lat = - Math.PI * val / 180
			return Math.log( Math.tan(lat) + 1/Math.cos(lat) ) / Math.PI * 128
		}
		
		geo_to_tile( val: $mol_vector_2d< number > ) {
			return new $mol_vector_2d(
				this.geo_to_tile_x( val.x ),
				this.geo_to_tile_y( val.y ),
			)
		}
		
	}
}
