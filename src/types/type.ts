export interface transfers {
	file_name: string;
	file_size: number;
	peer_id: string;
	total_chunks: number;
	received_chunks: number;
	status: string;
}

export interface peers {
	peer_id: string;
	ip: string;
	port: number;
	last_seen: Date;
}

export interface option {
	folder?: string;
	encrypt?: boolean;
	compress?: boolean;
	chunk_size?: number;
	verify?: boolean;
}
