var parse_csv = (csv) => csv.replaceAll("\"", "").split("\n").map((d) => d = d.split(",").map((b) => b.trim()))

// data noramlly pulled from api, but for demo purposes was filtered and sampled

function usage() {
    var sample_data = `"1/1/2022 12:00:00 AM","Meter #X","LOC","25.2732"\n"1/1/2022 12:00:00 AM", "Meter #Xg", "LOC", "-0.4770"\n"1/2/2022 12:00:00 AM", "Meter #X", "LOC", "22.5480"\n"1/2/2022 12:00:00 AM", "Meter #Xg", "LOC", "-1.3914"\n"1/3/2022 12:00:00 AM", "Meter #X", "LOC", "18.4914"\n"1/3/2022 12:00:00 AM", "Meter #Xg", "LOC", "-3.5562"\n"1/4/2022 12:00:00 AM", "Meter #X", "LOC", "21.6240"\n"1/4/2022 12:00:00 AM", "Meter #Xg", "LOC", "-9.3222"\n"1/5/2022 12:00:00 AM", "Meter #X", "LOC", "12.7620"\n"1/5/2022 12:00:00 AM", "Meter #Xg", "LOC", "-11.8968"\n"1/6/2022 12:00:00 AM", "Meter #X", "LOC", "15.5340"\n"1/6/2022 12:00:00 AM", "Meter #Xg", "LOC", "-13.0968"\n"1/7/2022 12:00:00 AM", "Meter #X", "LOC", "15.1926"\n"1/7/2022 12:00:00 AM", "Meter #Xg", "LOC", "-8.7300"\n"1/8/2022 12:00:00 AM", "Meter #X", "LOC", "15.3360"\n"1/8/2022 12:00:00 AM", "Meter #Xg", "LOC", "-11.5956"\n"1/9/2022 12:00:00 AM", "Meter #X", "LOC", "18.3354"`
    sample_data = parse_csv(sample_data);
    sample_data = sample_data.filter((x) => parseInt(x[3]) > 0);
    var usage_data = []
    for (var p of sample_data) {
        var date_arr = new Date(p[0]).toDateString().split(" ");
        usage_data.push([new Date(date_arr[1] + " " + date_arr[2]), p[3]]);
    }

    return usage_data;
}

function island() {
    var sample_island = `Coal,13.3\nMotor Gasoline, 40.3\nDistillate Fuel Oil, 28.1\nJet Fuel, 51.3\nHGL, 3.4\nResidual Fuel, 53.6\nOther Petroleum, 11.7\nBiomass, 8.4\nOther Renewables, 22.2`
    var island_data = parse_csv(sample_island);
    return island_data;
}