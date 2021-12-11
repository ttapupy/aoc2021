base_name = '10'
chunks = File.readlines("./#{base_name}.txt", chomp: true)

regexp = /(\(\)|\[\]|\{\}|<>)/
closings = { ')'=> 3, ']'=> 57, '}'=> 1197, '>'=> 25137 }
closing_regexp = /(\)|\]|\}|>)/
points = 0
part2 = []

chunks.each do |chunk|
  valid = true
  test = chunk.dup
  while valid && test.size > 0
    prev_length = test.size
    test = test.gsub(regexp, '')
    if test.size == prev_length
      sign =  test[closing_regexp]    
      point = closings[sign] || 0
      if point == 0
        part2 << test
      end
      points += point
      valid = false
    end
  end
end
puts points

res2 = []
scoring = { '('=> 1, '['=> 2, '{'=> 3, '<'=> 4 }

part2.each do |inc|
  sub = 0
  inc.reverse.chars.each do |sign|
      sub *= 5
      sub += scoring[sign]
  end
  res2 << sub
end

puts res2.sort[res2.size / 2]