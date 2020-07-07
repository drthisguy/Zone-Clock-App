import React from 'react'
import './style.css'

export const SearchField = props => <input className="form-control form-rounded" {...props} />

export const Button = props => <button className="btn btn-primary btn-lg btn-block" {...props} >{props.children}</button>

