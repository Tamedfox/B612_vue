import moment from 'moment'

export function formatDate(time){
    return moment(time).format('YYYY-MM-DD')
  }
