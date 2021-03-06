import React, {Component} from 'react';
import query from "../queries/fetchSongs"
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import gql from 'graphql-tag';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({variables:{id}})
            .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({id, title}) => {
            return (
                <li key = {id} className = "collection-item">
                    <Link to = {`/song/${id}`}>
                        {title}
                    </Link>
                    <i className = "material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/song/new" className = "btn-floating btn-large red right">
                    <i className = "material-class">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);