base_name = '9'
heightmap = File.readlines("./#{base_name}.txt", chomp: true).map do |line| 
  line.chars.map(&:to_i)
end

def adjacents(data, y, x)
  res = []
  res << data[y][x-1] if x > 0
  res << data[y-1][x] if y > 0
  res << data[y][x+1] if x < data[0].size-1
  res << data[y+1][x] if y < data.size-1

  res
end

low_points = []
heightmap.each_with_index do |row, ri|
  row.each_with_index do |point, ci|
    if adjacents(heightmap, ri, ci).all? {|a| a > point }
      low_points << point +1
    end
  end
end
puts low_points.sum