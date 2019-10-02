import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.styles.scss';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartASync } from '../../redux/shop/shop.actions';

class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStartASync } = this.props;
    fetchCollectionsStartASync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartASync: () => dispatch(fetchCollectionsStartASync())
})

export default connect(null, mapDispatchToProps)(ShopPage);