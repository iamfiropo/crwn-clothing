import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './shop.styles.scss';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionsStartASync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStartASync } = this.props;
    fetchCollectionsStartASync();
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={props => (
          <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />
        )} />
        <Route path={`${match.path}/:collectionId`} render={props => (
          <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
        )} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartASync: () => dispatch(fetchCollectionsStartASync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);