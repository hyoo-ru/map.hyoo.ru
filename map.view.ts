namespace $.$$ {
	export class $hyoo_map extends $.$hyoo_map {
		
		@ $mol_mem
		photo( next?: boolean ) {
			const arg = next === undefined ? undefined : String( next )
			return this.$.$mol_state_arg.value( 'photo', arg ) === 'true'
		}
		
		@ $mol_mem
		center_offset() {
			
			const rect = this.view_rect() ?? { width: 0, height: 0 }
			
			return new $mol_vector_2d(
				rect.width / 2,
				rect.height / 2,
			)
			
		}
		
		@ $mol_mem
		center( next?: $mol_vector_2d< number > ) {
			
			const offset = this.center_offset()
			const arg = next ? ( next[0] - offset.x ) + 'x' + ( next[1] - offset.y ) : undefined
			
			const str = this.$.$mol_state_arg.value( 'center', arg )
			if( str ) {
				const coords = str.split( 'x' ).map( Number )
				return new $mol_vector_2d( coords[0] + offset.x, coords[1] + offset.y )
			}
			
			return offset
		}
		
		@ $mol_mem
		zoom_limit() {
			const rect = this.view_rect()
			const tile_size = this.tile_size()
			return new $mol_vector_range(
				Math.max( ( rect?.width ?? 0 ) / tile_size / 2, ( rect?.height ?? 0 ) / tile_size / 2 ),
				Infinity
			)
		}
		
		@ $mol_mem
		zoom( next?: number ) {
			
			const limit = this.zoom_limit()
			const arg = next ? String( Math.min( Math.max( limit.min, next ), limit.max ) ) : undefined
			const str = this.$.$mol_state_arg.value( 'zoom', arg )
			
			return Math.min( Math.max( limit.min, Number( str ) || 1 ), limit.max )
			
		}
		
		search() {
			
			const res = this.$.$mol_geo_search({ query: this.query() })[0]
			if( !res ) return
			
			const offset = this.center_offset()
			const pane = this.Pane()
			const zoom = 180 * this.zoom_limit().min / res.box.transponed().map( p => pane.geo_to_tile(p) ).distance()
			const center = pane.geo_to_tile( res.coord ).multed0( -zoom ).added1( offset )
			
			this.zoom( zoom )
			this.center( center )
			
		}
		
		tiles_uri() {
			return this.tiles_options()[ this.photo() ? 'photo' : 'sketch' ]
		}
		
	}
}
