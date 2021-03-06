epoch = datetime(1970, 1, 1) :
  td = date - epoch
  return td.days * 86400 + td.seconds + (float(td.microseconds) / 1000000)

def score(ups, downs) :
  return ups - downs

def hot(ups, downs, date) :
  s = score(ups, downs)
  order = log(max(abs(s), 1), 10)
  sign = 1 if s > 0 else -1 if s < 0 else 0
  seconds = epoch_seconds(date) - 1134028003
  return round(sign * order + seconds / 45000, 7)

function score(ups, downs) {
  return ups - downs;
}

