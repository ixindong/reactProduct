import React from 'react';
import {Route} from 'react-router'

export default (
    <div>
      <Route path='demo1' getComponent={(location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./demo1/containers'))
        },'demo1')
      }} />
      <Route path='demo2' getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./demo2/containers'))
          },'demo2')
        }} />
        <Route path='productList' getComponent={(location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./ProductList/containers'))
            },'productList')
        }} />
        <Route path='applicant' getComponent={(location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./Applicant/containers'))
            },'applicant')
        }} />
        <Route path='insured' getComponent={(location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./Insured/containers'))
            },'insured')
        }} />
        <Route path='InsurancePlan' getComponent={(location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./InsurancePlan/containers'))
            },'InsurancePlan')
        }} />

      <Route path='proposal' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./Proposal/containers'))
        },'proposal')
      }} />
      <Route path='proposalDetail' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./ProposalDetail/containers'))
        },'proposalDetail')
      }} />
      <Route path='proposalTermList' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./ProposalTermList/containers'))
        },'ProposalTermList')
      }} />
      <Route path='proposalTermDetail' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./ProposalTermDetail/containers'))
        },'ProposalTermDetail')
      }} />
      <Route path='makeProposal' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./MakeProposal/containers'))
        },'MakeProposal')
      }} />
      <Route path='proposalPreview' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./ProposalPreview/containers'))
        },'ProposalPreview')
      }} />
      <Route path='insuranceList' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./insuranceList/containers'))
        },'insuranceList')
      }} />
      <Route path='signDetail' getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./SignDetail/containers'))
        },'sigDetail')
      }} />
    </div>
)
